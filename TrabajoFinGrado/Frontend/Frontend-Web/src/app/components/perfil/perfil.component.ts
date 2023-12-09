import { Component,OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/user/user-dto/user-dto';
import { NewUsuarioPropertyService } from 'src/app/services/new-usuario-proerty.service';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserUpdate } from 'src/app/models/user/user-update';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  public faWarning = faExclamationTriangle;
  public usuario : UserDto;
  public usuarioUpdate : UserUpdate;
  public actualizar : boolean = false;
  
  constructor(private httpClient: HttpClient, private utilsService : UtilsService){

    this.usuarioUpdate = new UserUpdate();

    this.usuario = new UserDto();
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

  public focusOutPerfil(){
    this.actualizar = true;
  }

  public cancelar(){
    this.actualizar = false;
  }

  public actualizarPerfil(){
    this.actualizar = false;
    this.usuarioUpdate.id = this.usuario.id;
    this.usuarioUpdate.nombre = this.usuario.nombre;
    this.usuarioUpdate.email = this.usuario.email;
    this.usuarioUpdate.username = this.usuario.username;
    this.usuarioUpdate.descripcion = this.usuario.descripcion;
    this.usuarioUpdate.rol = this.usuario.rol.toString();

    
    //const url: string = 'http://localhost:6969/api/users/update';
    const url: string = 'https://alquilaenmadrid.com/api/users/update';


    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.httpClient.put(url, this.usuarioUpdate, { headers }).toPromise().then((response: any) => {
        console.log('Usuario updateado correctamente');
        this.utilsService.alert('success','Se ha actualizado tu perfil correctamente');

      }).catch((error) => {
        console.error('Se ha producido un error al updatear el usuario:', error);
      });
    }
  }
}
