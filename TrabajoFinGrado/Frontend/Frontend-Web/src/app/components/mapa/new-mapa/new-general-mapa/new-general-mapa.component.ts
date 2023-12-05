import { Component } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { MapaDto } from 'src/app/models/mapa/mapa-dto';
import { NewMapasPropertyService } from 'src/app/services/new-mapas-property.service';
@Component({
  selector: 'app-new-general-mapa',
  templateUrl: './new-general-mapa.component.html',
  styleUrls: ['./new-general-mapa.component.css']
})
export class NewGeneralMapaComponent {
  public faWarning = faExclamationTriangle;
  public mapa : MapaDto;

  constructor(private newMapaPropertyService : NewMapasPropertyService){
    this.mapa = new MapaDto();
  }


  ngOnInit(): void {
  }



  public focusOutMapas(){
    this.newMapaPropertyService.emitMapaProperty(this.mapa);
  }
}
