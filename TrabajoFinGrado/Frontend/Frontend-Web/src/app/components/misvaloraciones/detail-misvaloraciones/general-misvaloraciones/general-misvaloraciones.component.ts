import { Component } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ComentarioDto } from 'src/app/models/comentario/comentario-dto/comentario-dto';
import { NewComentarioPropertyService } from 'src/app/services/new-comentario-property.service';

@Component({
  selector: 'app-general-misvaloraciones',
  templateUrl: './general-misvaloraciones.component.html',
  styleUrls: ['./general-misvaloraciones.component.css']
})
export class GeneralMisvaloracionesComponent {
  public faWarning = faExclamationTriangle;
  public comentario : ComentarioDto;


  constructor(private newComentarioPropertyService : NewComentarioPropertyService){
        this.comentario = new ComentarioDto();
  }



  ngOnInit(): void {
    this.listenComentario()
  }

  private listenComentario(){
    this.newComentarioPropertyService.getComentarioPropertyObservable().subscribe((comentario:ComentarioDto) => {
      this.comentario = comentario;
    });
  }


  public focusOutComentario(){
  
  this.newComentarioPropertyService.emitComentarioProperty(this.comentario);
  console.log(this.comentario)
  }
}

