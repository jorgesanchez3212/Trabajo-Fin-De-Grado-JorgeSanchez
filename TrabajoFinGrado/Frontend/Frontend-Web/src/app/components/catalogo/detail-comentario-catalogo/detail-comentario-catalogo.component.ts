import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faFilePdf, faTimes, faInfo, faSave, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ComentarioCreateDto } from 'src/app/models/comentario/comentario-dto/comentario-create';
import { ComentarioDto } from 'src/app/models/comentario/comentario-dto/comentario-dto';
import { NewComentariosPropertyService } from 'src/app/services/new-comentarios-property.service';



@Component({
  selector: 'app-detail-comentario-catalogo',
  templateUrl: './detail-comentario-catalogo.component.html',
  styleUrls: ['./detail-comentario-catalogo.component.css']
})
export class DetailComentarioCatalogoComponent {
  public comentarios : ComentarioDto[];
  public comentarioTuyo : ComentarioCreateDto;
  public idAutmovil : string = "";

  public faWarning = faExclamationTriangle;
  public faFilePdf = faFilePdf;
  public faTimes = faTimes;
  public faInfo = faInfo;
  public faFloppy = faSave;

  constructor(private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) private data: any,  private newComentariosProperty: NewComentariosPropertyService,
  private dialogRef: MatDialogRef<DetailComentarioCatalogoComponent>){

    this.comentarios = data.comentario;
    this.comentarioTuyo = new ComentarioCreateDto();

  }

  ngOnInit(): void {
    this.loadData();
    this.listenIdAutomovil()
  }

  private loadData(){
    this.newComentariosProperty.emitComentarioProperty(this.comentarios);
  }

  private listenIdAutomovil(){
    this.newComentariosProperty.getStringPropertyObservable().subscribe((data:string)=>{
      this.idAutmovil = data as string;
    });
  }

  public async saveComentario(){
    const url: string = 'http://localhost:6969/api/comentarios/newComentarios';
    //const url: string = 'http://128.140.34.184:8080/api/automoviles/newComentarios';


    const token = localStorage.getItem('access_token');
    const id = localStorage.getItem('access_id');

    
    this.comentarioTuyo.idUser = id!;
    this.comentarioTuyo.idAutomovil = this.idAutmovil


    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.httpClient.post(url, this.comentarioTuyo, { headers }).toPromise().then((response: any) => {
        console.log('Comentario insertado correctamente');
        this.dialogRef.close();
      }).catch((error) => {
        console.error('Se ha producido un error al insertar el comentario:', error);
      });
    }
  }
}


