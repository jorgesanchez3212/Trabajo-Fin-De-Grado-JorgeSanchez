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



  constructor(private httpService: HttpClient, private utilsService : UtilsService, public dialog: MatDialog){
    this.automoviles = [];
    this.automovil = new AutomovilDto();
   
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
        } else {
          console.log("Automovil borrado")
        }
      }
    });
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




  openModal(id:string){
    const url: string = `http://localhost:6969/api/automoviles/find/${id}`;
    //const url: string = `http://128.140.34.184:8080/api/automoviles/find/${id}`; 

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



