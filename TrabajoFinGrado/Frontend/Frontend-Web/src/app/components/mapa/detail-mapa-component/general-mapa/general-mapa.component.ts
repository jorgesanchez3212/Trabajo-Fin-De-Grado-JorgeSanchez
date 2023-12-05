import { Component } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { MapaDto } from 'src/app/models/mapa/mapa-dto';
import { NewMapasPropertyService } from 'src/app/services/new-mapas-property.service';

@Component({
  selector: 'app-general-mapa',
  templateUrl: './general-mapa.component.html',
  styleUrls: ['./general-mapa.component.css']
})
export class GeneralMapaComponent {
  public faWarning = faExclamationTriangle;
  public mapa : MapaDto;
  private fileContentBase64: string | null = null;

  constructor(private newMapaPropertyService : NewMapasPropertyService){
    this.mapa = new MapaDto();
  }


  ngOnInit(): void {
    this.listenMapas()
  }

  private listenMapas(){
    this.newMapaPropertyService.getMapaPropertyObservable().subscribe((mapa:MapaDto) => {
      this.mapa = mapa;
    })
  }

  public focusOutMapas(){
    this.newMapaPropertyService.emitMapaProperty(this.mapa);
  }

}
