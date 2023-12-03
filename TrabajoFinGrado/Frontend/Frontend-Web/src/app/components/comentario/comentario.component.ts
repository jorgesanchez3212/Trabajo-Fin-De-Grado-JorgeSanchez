import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ComentarioDto } from 'src/app/models/comentario/comentario-dto/comentario-dto';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  public comentarios : ComentarioDto[]
  public comentario : ComentarioDto;


  constructor(private httpService: HttpClient, private utilsService : UtilsService){
    this.comentarios = [];
    this.comentario = new ComentarioDto();
  }

  ngOnInit(): void {
    this.getComentariosAll()
  }









  private getComentariosAll(){
    //const url : string = 'http://128.140.34.184:8080/api/comentarios/listaComentarios'
    const url : string = 'http://localhost:6969/api/comentarios/listaComentarios'

    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.httpService.get(url, { headers }).toPromise().then((value: any) => {
      this.comentarios = value as ComentarioDto[];
      console.log(this.comentarios)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los comentarios');
    });
  }
  }
}
