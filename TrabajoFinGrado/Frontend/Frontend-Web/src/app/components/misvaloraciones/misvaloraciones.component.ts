import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComentarioDto } from 'src/app/models/comentario/comentario-dto/comentario-dto';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogAnimationsComponent } from '../automoviles/dialog-animations/dialog-animations.component';
import { DetailMisvaloracionesComponent } from './detail-misvaloraciones/detail-misvaloraciones.component';

@Component({
  selector: 'app-misvaloraciones',
  templateUrl: './misvaloraciones.component.html',
  styleUrls: ['./misvaloraciones.component.css']
})
export class MisvaloracionesComponent {
  public comentarios : ComentarioDto[]
  public comentario : ComentarioDto;
  public isComentariosIsNull = false;

  
  constructor(private httpService: HttpClient, private utilsService : UtilsService, public dialog: MatDialog){
    this.comentarios = [];
    this.comentario = new ComentarioDto();
  }

  ngOnInit(): void {
    let id = localStorage.getItem('access_id');
    if(id === null){
      id = '0'
    }
    this.getComentariosAllByClienteId(id);
  }


  private getComentariosAllByClienteId(id:string){
    //const url : string = `http://128.140.34.184:8080/api/comentarios/listaComentariosByClienteId/${id}`
    const url : string = `http://localhost:6969/api/comentarios/listaComentariosByClienteId/${id}`

    const token = localStorage.getItem('access_token');


    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.httpService.get(url).toPromise().then((value: any) => {
      this.comentarios = value as ComentarioDto[];
      if(this.comentarios.length === 0){
        this.isComentariosIsNull = true;
      }else{
        this.isComentariosIsNull = false;
      }
      console.log(this.comentarios)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los comentarios');
    });
  }
  }



  
  openDialog(id : string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'Si') {
          this.deleteComentarioById(id);
          this.utilsService.alert('success','Se ha eliminado la valoración correctamente')
          let idd = localStorage.getItem('access_id');
          if(idd === null){
          idd = '0'
          }
          this.getComentariosAllByClienteId(idd);
        } else {
          console.log("Automovil borrado")
        }
      }
    });
  }

  
  private deleteComentarioById(id: string) {
    const url: string = `http://localhost:6969/api/comentarios/delete/${id}`; 
    let idd = localStorage.getItem('access_id');

    const token = localStorage.getItem('access_token');
  
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      this.httpService.post(url, { headers }).toPromise().then((response: any) => {
        console.log('Comentario eliminado correctamente');
        if(idd === null){
          idd = '0'
        }
        this.getComentariosAllByClienteId(idd);
      }).catch((error) => {
        console.error('Se ha producido un error al eliminar el comentario:', error);
      });
    }
    if(idd === null){
      idd = '0'
    }
    this.getComentariosAllByClienteId(idd);
  }


  openModal(id:string){
    const url: string = `http://localhost:6969/api/comentarios/find/${id}`;
    //const url: string = `http://128.140.34.184:8080/api/reservas/find/${id}`; 
    let idd = localStorage.getItem('access_id');


    this.httpService.get(url).toPromise().then((data: any) => {
      console.log(data);
      this.comentario = data as ComentarioDto;
      this.dialog.open(DetailMisvaloracionesComponent, {
        width: '70%', height: '70%', data: {
          comentario: this.comentario,
        }
      }).afterClosed().subscribe(() => {
        if(idd === null){
          idd = '0'
        }
        this.getComentariosAllByClienteId(idd);
        //this.clearEmit();
      });
    }).catch(() => {
      console.log('Se ha producido un error al obtener el comentario');
    })

  }
  

  onContextModificarClick(comentario : ComentarioDto){
    this.openModal( comentario.id as string);

  }

}
