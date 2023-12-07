import { Component } from '@angular/core';
import { ComentarioDto } from 'src/app/models/comentario/comentario-dto/comentario-dto';
import { NewComentariosPropertyService } from 'src/app/services/new-comentarios-property.service';

@Component({
  selector: 'app-general-comentario-catalogo',
  templateUrl: './general-comentario-catalogo.component.html',
  styleUrls: ['./general-comentario-catalogo.component.css']
})
export class GeneralComentarioCatalogoComponent {
  public comentarios : ComentarioDto[];
  constructor(private newComentariosPropertyService : NewComentariosPropertyService){
    this.comentarios = [];
  }


  ngOnInit(): void {
    this.listen()
  }

  private listen(){
    this.newComentariosPropertyService.getComentarioPropertyObservable().subscribe((comentario:ComentarioDto[]) => {
      this.comentarios = comentario;
    })
  }

}
