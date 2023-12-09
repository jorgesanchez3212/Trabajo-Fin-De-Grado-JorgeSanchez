import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ComentarioDto } from 'src/app/models/comentario/comentario-dto/comentario-dto';
import { ContactoDto } from 'src/app/models/contacto/contact-dto';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  public comentarios : ContactoDto[]
  public comentario : ContactoDto;


  constructor(private httpService: HttpClient, private utilsService : UtilsService){
    this.comentarios = [];
    this.comentario = new ContactoDto();
  }

  ngOnInit(): void {
    this.getComentariosAll()
  }









  private getComentariosAll(){
    const url : string = 'https://alquilaenmadrid.com/api/contactos/listaContactos'
    //const url : string = 'http://localhost:6969/api/contactos/listaContactos'

    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.httpService.get(url, { headers }).toPromise().then((value: any) => {
      this.comentarios = value as ContactoDto[];
      console.log(this.comentarios)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los comentarios');
    });
  }
  }
}
