import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDto } from 'src/app/models/user/user-dto/user-dto';
import { NewUsuarioPropertyService } from 'src/app/services/new-usuario-proerty.service';
import { faFilePdf, faTimes, faInfo, faSave } from '@fortawesome/free-solid-svg-icons';
import { UserUpdate } from 'src/app/models/user/user-update';
import { UtilsService } from 'src/app/services/utils.service';




@Component({
  selector: 'app-new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.css']
})
export class NewUsuarioComponent {
  
  public faFilePdf = faFilePdf;
  public faTimes = faTimes;
  public faInfo = faInfo;
  public faFloppy = faSave;


  public usuario : UserDto;
  public usuarioUpdate : UserUpdate;

  constructor(private httpClient: HttpClient, private utilsService : UtilsService ,@Inject(MAT_DIALOG_DATA) private data: any,  private newUsuarioPropertyService: NewUsuarioPropertyService,
  private dialogRef: MatDialogRef<NewUsuarioComponent>){

    this.usuario = new UserDto();
    this.usuarioUpdate = new UserUpdate();

  }

  ngOnInit(): void {
    this.listenUsuario();
  }



  private listenUsuario(){
    this.newUsuarioPropertyService.getUsuarioPropertyObservable().subscribe((usuario:UserDto)=>{
      this.usuario = usuario;
      this.usuarioUpdate.id = this.usuario.id;
      this.usuarioUpdate.username = this.usuario.username;
      this.usuarioUpdate.nombre = usuario.nombre;
      this.usuarioUpdate.descripcion = usuario.descripcion;
      this.usuarioUpdate.rol = usuario.rol[0];
      this.usuarioUpdate.email = usuario.email;
    });

    
  }

  public async saveUsuario(){
    //const url: string = 'http://localhost:6969/api/users/añadir';
    const url: string = 'https://alquilaenmadrid.com/api/users/añadir';


    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.httpClient.post(url, this.usuario, { headers }).toPromise().then((response: any) => {
        console.log('Usuario insertado correctamente');
        this.utilsService.alert('success','Se ha insertado el usuario correctamente');

        this.dialogRef.close();
      }).catch((error) => {
        console.error('Se ha producido un error al insertar el usuario:', error);
      });
    }
  }
}
