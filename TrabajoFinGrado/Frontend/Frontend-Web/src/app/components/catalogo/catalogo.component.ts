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
import { CatalogoDto } from 'src/app/models/catalogo/catalogo-dto';
import { formatDate } from '@angular/common';


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
  public titulo : string ='';
  public reservaFilterFin: Date | null = null;
  public reservaFilterInicio: Date | null = null;
  public tipos : string[];
  public colores : string[];
  public marcas : string[];
  public capacidades : string[];



  public catalogoDto : CatalogoDto =new CatalogoDto();

  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    // Restablece la hora de hoy a la medianoche para la comparación
    today.setHours(0, 0, 0, 0);
    
    const selectedDate = (d || new Date());
    // Restablece la hora de la fecha seleccionada a la medianoche para la comparación
    selectedDate.setHours(0, 0, 0, 0);
  
    // Verifica si la fecha seleccionada es anterior a hoy
    return selectedDate >= today;
  };

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
    this.tipos = ['COCHE', 'CAMION', 'FURGONETA', 'MOTO'];
    this.capacidades = ['1', '2', '3', '4', '5'];
    this.colores = ['Blanco', 'Negro', 'Naranja', 'Rojo', 'Verde'];
    this.marcas = ['Audi', 'Mercedes', 'Porsche', 'BMW'];


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
      this.titulo = `Resultados totales: ${this.automoviles.length} Automoviles`

      console.log(this.automoviles)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los automoviles');
    });
  }
  }







onContextFiltrarClick(){
  const url : string = 'http://localhost:6969/api/automoviles/catalogoFiltros'

  
    // Para fechaFin
if (this.reservaFilterFin) {
  this.catalogoDto.fechaFinal = formatDate(this.reservaFilterFin, 'yyyy-MM-dd', 'en-US');
}

// Para fechaInicio
if (this.reservaFilterInicio) {
  this.catalogoDto.fechaInicio = formatDate(this.reservaFilterInicio, 'yyyy-MM-dd', 'en-US');
} 

  const token = localStorage.getItem('access_token');
  if(this.catalogoDto.fechaFinal != null && this.catalogoDto.fechaFinal != null && this.catalogoDto.tipoAutomovil != null){

  if (token) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  this.httpService.post(url, this.catalogoDto , { headers }).toPromise().then((value: any) => {
    this.automoviles = value as AutomovilDto[];
    console.log(this.automoviles)
    this.titulo = `Resultados totales: ${this.automoviles.length} Automoviles`
  }).catch((error) => {
    
    console.log('Se ha producido un error al obtener los automoviles');
  });
}
}

}

clearFilters() {
this.automovilFilter.marca = '';
this.automovilFilter.id = '';
this.getAutomovilesAll();
}


buscar(){
 //const url : string = 'http://128.140.34.184:8080/api/automoviles/catalogo'
 const url : string = 'http://localhost:6969/api/automoviles/catalogo'

    // Para fechaFin
if (this.reservaFilterFin) {
  this.catalogoDto.fechaFinal = formatDate(this.reservaFilterFin, 'yyyy-MM-dd', 'en-US');
}

// Para fechaInicio
if (this.reservaFilterInicio) {
  this.catalogoDto.fechaInicio = formatDate(this.reservaFilterInicio, 'yyyy-MM-dd', 'en-US');
} 
 const token = localStorage.getItem('access_token');
if(this.catalogoDto.fechaFinal != null && this.catalogoDto.fechaFinal != null && this.catalogoDto.tipoAutomovil != null){
 if (token) {
   const headers = new HttpHeaders({
     Authorization: `Bearer ${token}`
   });

 this.httpService.post(url,this.catalogoDto, { headers }).toPromise().then((value: any) => {
   this.automoviles = value as AutomovilDto[];
   this.titulo = `Resultados disponibles: ${this.automoviles.length} Automoviles`

   console.log(this.automoviles)
 }).catch((error) => {
   
   console.log('Se ha producido un error al obtener los automoviles');
 });
}
}
}

}