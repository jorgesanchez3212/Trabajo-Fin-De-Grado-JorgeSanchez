import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDto } from 'src/app/models/user/user-dto/user-dto';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogAmimationsComponent } from './dialog-amimations/dialog-amimations.component';
import { DetailUsuarioComponent } from './detail-usuario/detail-usuario.component';
import { NewUsuarioComponent } from './new-usuario/new-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{

  public usuarios : UserDto[]
  public user : UserDto;

  constructor(private httpService: HttpClient, private utilsService : UtilsService, public dialog: MatDialog){
    this.usuarios = [];
    this.user = new UserDto();
   
  }

  openDialog(usuarioId : string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAmimationsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'Si') {
          this.deleteUsuarioById(usuarioId);
        } else {
          console.log("Usuario borrado")
        }
      }
    });
  }

  ngOnInit(): void {
    this.getUsuariosAll();
  }

  private deleteUsuarioById(id: string) {
    const url: string = `http://localhost:6969/api/users/delete/${id}`; 
  
    const token = localStorage.getItem('access_token');
  
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      this.httpService.post(url, { headers }).toPromise().then((response: any) => {
        console.log('Usuario eliminado correctamente');
      }).catch((error) => {
        console.error('Se ha producido un error al eliminar el usuario:', error);
      });
    }
  }
  

  private getUsuariosAll(){
    //const url : string = 'http://128.140.34.184:8080/api/users/listaUsuarios'
    const url : string = 'http://localhost:6969/api/users/listaUsuarios'

    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.httpService.get(url, { headers }).toPromise().then((value: any) => {
      this.usuarios = value as UserDto[];
      console.log(this.usuarios)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los usuarios');
    });
  }
  }

  openModal(id:string){
    const url: string = `http://localhost:6969/api/users/find/${id}`;
    //const url: string = `http://128.140.34.184:8080/api/users/find/${id}`; 

    this.httpService.get(url).toPromise().then((data: any) => {
      console.log(data);
      this.user = data as UserDto;
      this.dialog.open(DetailUsuarioComponent, {
        width: '70%', height: '70%', data: {
          usuario: this.user,
        }
      }).afterClosed().subscribe(() => {
        this.getUsuariosAll();
        //this.clearEmit();
      });
    }).catch(() => {
      console.log('Se ha producido un error al obtener el usuario');
    })

  }
  

  onContextModificarClick(usuario : UserDto){
    this.openModal( usuario.id as string);

  }


  openModalNew(){
      this.dialog.open(NewUsuarioComponent, {
        width: '70%', height: '70%', data: {
        }
      }).afterClosed().subscribe(() => {
        this.getUsuariosAll();
        //this.clearEmit();
      });

  }

  onContextNewClick(){
    this.openModalNew();
  }



}
