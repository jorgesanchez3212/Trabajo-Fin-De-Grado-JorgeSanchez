import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDto } from 'src/app/models/user/user-dto/user-dto';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogAmimationsComponent } from './dialog-amimations/dialog-amimations.component';
import { DetailUsuarioComponent } from './detail-usuario/detail-usuario.component';
import { NewUsuarioComponent } from './new-usuario/new-usuario.component';
import { UserFilter } from 'src/app/models/user/user-filter/user-filter';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{

  public usuarios : UserDto[]
  public user : UserDto;
  panelOpenState = false;
  filterUsername = '';
  public userFilter : UserFilter = new UserFilter();
  public roles : string[] 


  constructor(private httpService: HttpClient, private utilsService : UtilsService, public dialog: MatDialog){
    this.usuarios = [];
    this.user = new UserDto();
    this.roles = ['ADMINISTRADOR', 'CLIENTE']
   
  }


  applyFilter() {
    // Implementa la lógica para filtrar los usuarios por username
  }

  clearFilter() {
    this.filterUsername = '';
    // Implementa la lógica para limpiar el filtro y mostrar todos los usuarios
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
          this.utilsService.alert('success','Se ha eliminado el usuario correctamente');
          this.getUsuariosAll();
        } else {
          console.log("Usuario borrado")
        }
      }
    });
    this.getUsuariosAll();

  }

  ngOnInit(): void {
    this.getUsuariosAll();
  }

  private deleteUsuarioById(id: string) {
    //const url: string = `http://localhost:6969/api/users/delete/${id}`;
    const url: string = `https://alquilaenmadrid.com/api/users/delete/${id}`; 
 
  
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
    const url : string = 'https://alquilaenmadrid.com/api/users/listaUsuarios'
    //const url : string = 'http://localhost:6969/api/users/listaUsuarios'

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
    //const url: string = `http://localhost:6969/api/users/find/${id}`;
    const url: string = `https://alquilaenmadrid.com/api/users/find/${id}`; 

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

  onContextFiltrarClick(){
    const url : string = 'https://alquilaenmadrid.com/api/users/listaUsuariosFiltro'
    //const url : string = 'http://localhost:6969/api/users/listaUsuariosFiltro'

    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.httpService.post(url, this.userFilter , { headers }).toPromise().then((value: any) => {
      this.usuarios = value as UserDto[];
      console.log(this.usuarios)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los usuarios');
    });
  }

}

clearFilters() {
  this.userFilter.username = null;
  this.userFilter.id = null;
  this.userFilter.nombre = null;
  this.userFilter.rol = null;
  this.userFilter.email = null;
  this.getUsuariosAll();
}


}
