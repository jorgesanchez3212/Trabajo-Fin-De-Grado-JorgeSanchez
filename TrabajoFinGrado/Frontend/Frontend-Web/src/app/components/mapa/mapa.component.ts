import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapaDto } from 'src/app/models/mapa/mapa-dto';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogAnimationsComponent } from '../automoviles/dialog-animations/dialog-animations.component';
import { DetailMapaComponentComponent } from './detail-mapa-component/detail-mapa-component.component';
import { NewMapaComponent } from './new-mapa/new-mapa.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  public mapas : MapaDto[]
  public mapa : MapaDto;
  



  constructor(private httpService: HttpClient, private utilsService : UtilsService, public dialog: MatDialog){
    this.mapas = [];
    this.mapa = new MapaDto();
   
  }

  ngOnInit(): void {
    this.getMapasAll();
  }


  private getMapasAll(){
    //const url : string = 'http://128.140.34.184:8080/api/mapas/listaMapas'
    const url : string = 'http://localhost:6969/api/mapas/listaMapas'

    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.httpService.get(url, { headers }).toPromise().then((value: any) => {
      this.mapas = value as MapaDto[];
      console.log(this.mapas)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los mpaas');
    });
  }
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
          this.deleteMapaById(numeroChasis);
        } else {
          console.log("Mapa borrado")
        }
      }
    });
  }

  private deleteMapaById(id: string) {
    const url: string = `http://localhost:6969/api/mapas/delete/${id}`; 
  
    const token = localStorage.getItem('access_token');
  
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      this.httpService.post(url, { headers }).toPromise().then((response: any) => {
        console.log('Mapa eliminado correctamente');
        this.getMapasAll()
      }).catch((error) => {
        console.error('Se ha producido un error al eliminar el mapa:', error);
        this.getMapasAll()
      });
    }
  }


  openModal(id:string){
    const url: string = `http://localhost:6969/api/mapas/find/${id}`;
    //const url: string = `http://128.140.34.184:8080/api/mapas/find/${id}`; 

    this.httpService.get(url).toPromise().then((data: any) => {
      console.log(data);
      this.mapa = data as MapaDto;
      this.dialog.open(DetailMapaComponentComponent, {
        width: '70%', height: '70%', data: {
          mapa: this.mapa,
        }
      }).afterClosed().subscribe(() => {
        this.getMapasAll();
        //this.clearEmit();
      });
    }).catch(() => {
      console.log('Se ha producido un error al obtener el mapa');
    })

  }
  

  onContextModificarClick(mapa : MapaDto){
    this.openModal( mapa.id as string);

  }

  openModalNew(){
    this.dialog.open(NewMapaComponent, {
      width: '70%', height: '70%', data: {
      }
    }).afterClosed().subscribe(() => {
      this.getMapasAll();
      //this.clearEmit();
    });

}

onContextNewClick(){
  this.openModalNew();
}

}
