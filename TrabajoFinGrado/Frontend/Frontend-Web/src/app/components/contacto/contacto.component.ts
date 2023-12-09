import { Component } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactoDto } from 'src/app/models/contacto/contact-dto';
import { ContactoCreateDto } from 'src/app/models/contacto/contacto-create';
import { UserDto } from 'src/app/models/user/user-dto/user-dto';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  public faWarning = faExclamationTriangle;
  public usuario = new UserDto();
  public contacto : ContactoDto;
  public contactoNew : ContactoCreateDto;
  public actualizar : boolean = false;
  
  constructor(private httpClient: HttpClient, private utilsService : UtilsService){

    this.contactoNew = new ContactoCreateDto();
    this.contacto = new ContactoDto();
  }


  ngOnInit(){
    const id = localStorage.getItem('access_id');
    this.findUsuario(id!);
  }

 
  
  public async findUsuario(id :string){
    //const url: string = `http://localhost:6969/api/users/find/${id}`;
    const url: string = `https://alquilaenmadrid.com/api/users/find/${id}`; 


    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.httpClient.get(url).toPromise().then((data: any) => {
        console.log(data);
        this.usuario = data as UserDto;
      }).catch((error) => {
        console.error('Se ha producido un error al recuperar el usuario:', error);
      });
    }
  }

  public cancelar(){
    this.contactoNew.descripcion = '';
    this.actualizar = false;
    
  }

  public focusOutContacto(){
    this.actualizar = true;
  } 
  public saveIncidencia(){
    this.actualizar = false;
    this.contactoNew.idCliente = this.usuario.id;

    
    //const url: string = 'http://localhost:6969/api/contactos/newContactos';
    const url: string = 'https://alquilaenmadrid.com/api/contactos/newContactos';


    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.httpClient.post(url, this.contactoNew, { headers }).toPromise().then((response: any) => {
        console.log('Contacto añadido correctamente');
        this.contactoNew.descripcion = '';
        this.utilsService.alert('success','Se ha añadido correctamente');
      }).catch((error) => {
        console.error('Se ha producido un error al añadir el contacto:', error);
      });
    }
  }
}
