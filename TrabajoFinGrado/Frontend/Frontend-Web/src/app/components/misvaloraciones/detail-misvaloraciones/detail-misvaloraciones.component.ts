import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faFilePdf, faTimes, faInfo, faSave } from '@fortawesome/free-solid-svg-icons';
import { ComentarioDto } from 'src/app/models/comentario/comentario-dto/comentario-dto';
import { ComentarioUpdate } from 'src/app/models/comentario/comentario-dto/comentario-update';
import { NewComentarioPropertyService } from 'src/app/services/new-comentario-property.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-detail-misvaloraciones',
  templateUrl: './detail-misvaloraciones.component.html',
  styleUrls: ['./detail-misvaloraciones.component.css']
})
export class DetailMisvaloracionesComponent {

  public comentario : ComentarioDto;
  public comentarioUpdate : ComentarioUpdate;
  
  public faFilePdf = faFilePdf;
  public faTimes = faTimes;
  public faInfo = faInfo;
  public faFloppy = faSave;

  constructor(private httpClient: HttpClient, private utilsService : UtilsService ,@Inject(MAT_DIALOG_DATA) private data: any,  private newComentarioPropertyService: NewComentarioPropertyService,
  private dialogRef: MatDialogRef<DetailMisvaloracionesComponent>){

    this.comentario = data.comentario;
    this.comentarioUpdate = new ComentarioUpdate();

  }

  ngOnInit(): void {
    this.loadData();
    this.listenComentario();
  }

  private loadData(){
    this.newComentarioPropertyService.emitComentarioProperty(this.comentario);
  }

  private listenComentario(){
    this.newComentarioPropertyService.getComentarioPropertyObservable().subscribe((comentario:ComentarioDto)=>{
      this.comentario = comentario;
      this.comentarioUpdate.id = comentario.id;
      this.comentarioUpdate.descripcion = comentario.descripcion;
    });
  }

  
  public async saveValoracion(){
    //const url: string = 'http://localhost:6969/api/comentarios/update';
    const url: string = 'https://alquilaenmadrid.com/api/comentarios/update';


    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.httpClient.put(url, this.comentarioUpdate, { headers }).toPromise().then((response: any) => {
        console.log('Comentario updateado correctamente');
        this.utilsService.alert('success','Se ha actualizado la valoracion correctamente');

        this.dialogRef.close();
      }).catch((error) => {
        console.error('Se ha producido un error al updatear el comentario:', error);
      });
    }
  }

}
