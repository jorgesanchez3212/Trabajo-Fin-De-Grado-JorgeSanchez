import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutomovilDto } from 'src/app/models/automovil/automovil-dto/automovil-dto';
import { AutomovilFilter } from 'src/app/models/automovil/automovil-filter/automovil-filter';
import { UtilsService } from 'src/app/services/utils.service';
import { DetailUsuarioComponent } from '../usuario/detail-usuario/detail-usuario.component';
import { NewUsuarioComponent } from '../usuario/new-usuario/new-usuario.component';
import { DialogAnimationsComponent } from '../automoviles/dialog-animations/dialog-animations.component';
import { Map, marker, tileLayer } from 'leaflet';
import { MapaDto } from 'src/app/models/mapa/mapa-dto';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {

  public automoviles : AutomovilDto[]
  public automovil : AutomovilDto;
  panelOpenState = false;
  public automovilFilter : AutomovilFilter = new AutomovilFilter();
  public ubicaciones : MapaDto[] = [];

  ngAfterViewInit(){
    // const map = new Map('map').setView([40.42517,-3.68718], 13);
    // tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 19,
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    // this.ubicaciones.forEach(location =>{
    //   marker([Number(location.latitud), Number(location.longitud)]).addTo(map)
    // });
   // marker([Number(this.ubicaciones[0].latitud), Number(this.ubicaciones[0].longitud)]).addTo(map);
  }
 
  constructor(private httpService: HttpClient, private utilsService : UtilsService, public dialog: MatDialog){
    this.automoviles = [];
    this.automovil = new AutomovilDto();
   
  }


  ngOnInit(): void {
    this.getAutomovilesAll();
    this.findAllMapas()
  }

  findAllMapas(){
  //const url : string = 'http://128.140.34.184:8080/api/mapas/listaMapas'
  const url : string = 'http://localhost:6969/api/mapas/listaMapas'

  const token = localStorage.getItem('access_token');

  if (token) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  this.httpService.get(url, { headers }).toPromise().then((value: any) => {
    this.ubicaciones = value as MapaDto[];
    console.log("Ubicaciones")
    console.log(this.ubicaciones)
    const map = new Map('map').setView([40.42517,-3.68718], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.ubicaciones.forEach(location =>{
      marker([Number(location.latitud), Number(location.longitud)]).addTo(map)
    });
  }).catch((error) => {
    
    console.log('Se ha producido un error al obtener los mpaas');
  });
}
  }

  
  


  private deleteAutomovilByNumeroChasis(numeroChasis: string) {
    const url: string = `http://localhost:6969/api/automoviles/delete/${numeroChasis}`; 
  
    const token = localStorage.getItem('access_token');
  
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      this.httpService.post(url, { headers }).toPromise().then((response: any) => {
        console.log('Automovil eliminado correctamente');
      }).catch((error) => {
        console.error('Se ha producido un error al eliminar el automovil:', error);
      });
    }
  }


  private getAutomovilesAll(){
    //const url : string = 'http://128.140.34.184:8080/api/automoviles/listaAutomoviles'
    const url : string = 'http://localhost:6969/api/automoviles/listaAutomoviles'

    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.httpService.get(url, { headers }).toPromise().then((value: any) => {
      this.automoviles = value as AutomovilDto[];
      console.log(this.automoviles)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los automoviles');
    });
  }
  }







onContextFiltrarClick(){
  const url : string = 'http://localhost:6969/api/automoviles/listaAutomovilesFiltro'

  const token = localStorage.getItem('access_token');

  if (token) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  this.httpService.post(url, this.automovilFilter , { headers }).toPromise().then((value: any) => {
    this.automoviles = value as AutomovilDto[];
    console.log(this.automoviles)
  }).catch((error) => {
    
    console.log('Se ha producido un error al obtener los automoviles');
  });
}

}

clearFilters() {
this.automovilFilter.marca = '';
this.automovilFilter.id = '';
this.getAutomovilesAll();
}

}