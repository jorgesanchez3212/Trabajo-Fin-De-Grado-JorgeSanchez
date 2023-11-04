import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDto } from 'src/app/models/user/user-dto/user-dto';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogAmimationsComponent } from './dialog-amimations/dialog-amimations.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{

  public usuarios : UserDto[]

  constructor(private httpService: HttpClient, private utilsService : UtilsService, public dialog: MatDialog){
    this.usuarios = [];
   
  }

  openDialog(usuarioId : string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAmimationsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === true) {
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
  
      this.httpService.delete(url, { headers }).toPromise().then((response: any) => {
        console.log('Usuario eliminado correctamente');
      }).catch((error) => {
        console.error('Se ha producido un error al eliminar el usuario:', error);
      });
    }
  }
  

  private getUsuariosAll(){
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



}
