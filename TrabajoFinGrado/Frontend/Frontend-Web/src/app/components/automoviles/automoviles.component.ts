import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutomovilDto } from 'src/app/models/automovil/automovil-dto/automovil-dto';
import { AutomovilFilter } from 'src/app/models/automovil/automovil-filter/automovil-filter';
import { UtilsService } from 'src/app/services/utils.service';
import { DetailUsuarioComponent } from '../usuario/detail-usuario/detail-usuario.component';
import { NewUsuarioComponent } from '../usuario/new-usuario/new-usuario.component';
import { DialogAnimationsComponent } from './dialog-animations/dialog-animations.component';
import { DetailAutomovilComponent } from './detail-automovil/detail-automovil.component';
import { NewAutomovilComponent } from './new-automovil/new-automovil.component';

@Component({
  selector: 'app-automoviles',
  templateUrl: './automoviles.component.html',
  styleUrls: ['./automoviles.component.css']
})
export class AutomovilesComponent {
  public automoviles : AutomovilDto[]
  public automovil : AutomovilDto;
  panelOpenState = false;
  public automovilFilter : AutomovilFilter = new AutomovilFilter();
  public colores : string[];
  public marcas : string[];
  public capacidades : string[];


  constructor(private httpService: HttpClient, private utilsService : UtilsService, public dialog: MatDialog){
    this.automoviles = [];
    this.automovil = new AutomovilDto();
    this.capacidades = ['1', '2', '3', '4', '5'];
    this.colores = ['Blanco', 'Negro', 'Naranja', 'Rojo', 'Verde'];
    this.marcas = ['Audi', 'Mercedes', 'Porsche', 'BMW'];
   
  }


  ngOnInit(): void {
    this.getAutomovilesAll();
  }


  openDialog(numeroChasis : string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'Si') {
          this.deleteAutomovilByNumeroChasis(numeroChasis);
          this.utilsService.alert('success','Se ha eliminado el automovil correctamente');

        } else {
          console.log("Automovil borrado")
        }
      }
      this.getAutomovilesAll()
    });
  }


  private deleteAutomovilByNumeroChasis(numeroChasis: string) {
    const url: string = `https://alquilaenmadrid.com/api/automoviles/delete/${numeroChasis}`; 
    //const url: string = `http://localhost:6969/api/automoviles/delete/${numeroChasis}`; 

  
    const token = localStorage.getItem('access_token');
  
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      this.httpService.post(url, { headers }).toPromise().then((response: any) => {
        console.log('Automovil eliminado correctamente');
        this.getAutomovilesAll()
      }).catch((error) => {
        console.error('Se ha producido un error al eliminar el automovil:', error);
      });
    }
    this.getAutomovilesAll()

  }


  private getAutomovilesAll(){
    const url : string = 'https://alquilaenmadrid.com/api/automoviles/listaAutomoviles'
    //const url : string = 'http://localhost:6969/api/automoviles/listaAutomoviles'

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




  openModal(id:string){
    //const url: string = `http://localhost:6969/api/automoviles/find/${id}`;
    const url: string = `https://alquilaenmadrid.com/api/automoviles/find/${id}`; 

    this.httpService.get(url).toPromise().then((data: any) => {
      console.log(data);
      this.automovil = data as AutomovilDto;
      this.dialog.open(DetailAutomovilComponent, {
        width: '70%', height: '70%', data: {
          automovil: this.automovil,
        }
      }).afterClosed().subscribe(() => {
        this.getAutomovilesAll();
        //this.clearEmit();
      });
    }).catch(() => {
      console.log('Se ha producido un error al obtener la reserva');
    })

  }
  

  onContextModificarClick(automovil : AutomovilDto){
    this.openModal( automovil.id as string);

  }





  openModalNew(){
    this.dialog.open(NewAutomovilComponent, {
      width: '70%', height: '70%', data: {
      }
    }).afterClosed().subscribe(() => {
      this.getAutomovilesAll();
      //this.clearEmit();
    });

}

onContextNewClick(){
  this.openModalNew();
}



onContextFiltrarClick(){
  //const url : string = 'http://localhost:6969/api/automoviles/listaAutomovilesFiltro'
  const url : string = 'https://alquilaenmadrid.com/api/automoviles/listaAutomovilesFiltro'


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
this.automovilFilter.marca =null;
this.automovilFilter.numeroChasis = null;
this.automovilFilter.color = null;
this.automovilFilter.capacidad = null;


this.getAutomovilesAll();
}

}



