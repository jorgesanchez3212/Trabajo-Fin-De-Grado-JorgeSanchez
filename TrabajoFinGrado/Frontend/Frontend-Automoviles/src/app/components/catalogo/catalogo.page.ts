import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit,AfterViewInit {

  private map!: L.Map;

  constructor() { }

  
  ngOnInit() {
    this.loadMap();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  private loadMap() {
    const map = L.map('map').setView([51.5, -0.09], 13);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
   attribution: 'Tiles &copy; Esri'
}).addTo(map);


    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('<p>Concesionario JSB</p>')
      .openPopup();

    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

}
