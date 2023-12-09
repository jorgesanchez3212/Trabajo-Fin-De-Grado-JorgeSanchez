import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservaDto } from 'src/app/models/reserva/reserva-dto';
import { UtilsService } from 'src/app/services/utils.service';
import { ReservaFilter } from 'src/app/models/reserva/reserva-filter';
import { DetailAutomovilComponent } from '../automoviles/detail-automovil/detail-automovil.component';
import { DialogAnimationsComponent } from '../automoviles/dialog-animations/dialog-animations.component';
import { formatDate } from '@angular/common';
import { DetailReservaComponent } from './detail-reserva/detail-reserva.component';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {
  public reservas : ReservaDto[]
  public reserva : ReservaDto;
  panelOpenState = false;
  public reservaFilterFin: Date | null = null;
  public reservaFilterInicio: Date | null = null;
  public reservaFilter : ReservaFilter = new ReservaFilter();

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
  


  constructor(private httpService: HttpClient, private utilsService : UtilsService, public dialog: MatDialog){
    this.reservas = [];
    this.reserva = new ReservaDto();
   
  }


  ngOnInit(): void {
    this.getReservasAll();
  }


  private getReservasAll(){
    const url : string = 'https://alquilaenmadrid.com/api/reservas/listaReservas'
    //const url : string = 'http://localhost:6969/api/reservas/listaReservas'

    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.httpService.get(url, { headers }).toPromise().then((value: any) => {
      this.reservas = value as ReservaDto[];
      console.log(this.reservas)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los reservas');
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
          this.deleteReservaById(numeroChasis);
        } else {
          console.log("Automovil borrado")
        }
      }
    });
  }


  private deleteReservaById(id: string) {
    //const url: string = `http://localhost:6969/api/reservas/delete/${id}`; 
    const url: string = `https://alquilaenmadrid.com/api/reservas/delete/${id}`; 
  
    const token = localStorage.getItem('access_token');
  
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      this.httpService.post(url, { headers }).toPromise().then((response: any) => {
        console.log('Reserva eliminada correctamente');
        this.utilsService.alert('success','Reserva eliminada correctamente');
        this.getReservasAll();
      }).catch((error) => {
        console.error('Se ha producido un error al eliminar la reserva:', error);
      });
    }
    this.getReservasAll();
  }




  openModal(id:string){
    //const url: string = `http://localhost:6969/api/reservas/find/${id}`;
    const url: string = `https://alquilaenmadrid.com/api/reservas/find/${id}`; 

    this.httpService.get(url).toPromise().then((data: any) => {
      console.log(data);
      this.reserva = data as ReservaDto;
      this.dialog.open(DetailReservaComponent, {
        width: '70%', height: '70%', data: {
          reserva: this.reserva,
        }
      }).afterClosed().subscribe(() => {
        this.getReservasAll();
        //this.clearEmit();
      });
    }).catch(() => {
      console.log('Se ha producido un error al obtener la reserva');
    })

  }
  

  onContextModificarClick(reserva : ReservaDto){
    this.openModal( reserva.id as string);

  }












  onContextFiltrarClick(){
    //const url : string = 'http://localhost:6969/api/reservas/listaReservasFiltro'
    const url : string = 'https://alquilaenmadrid.com/api/reservas/listaReservasFiltro'
  
    // Para fechaFin
if (this.reservaFilterFin) {
  this.reservaFilter.fechaFin = formatDate(this.reservaFilterFin, 'yyyy-MM-dd', 'en-US');
} else {
  this.reservaFilter.fechaFin = null;
}

// Para fechaInicio
if (this.reservaFilterInicio) {
  this.reservaFilter.fechaInicio = formatDate(this.reservaFilterInicio, 'yyyy-MM-dd', 'en-US');
} else {
  this.reservaFilter.fechaInicio = null;
}

    const token = localStorage.getItem('access_token');
  
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
    this.httpService.post(url, this.reservaFilter , { headers }).toPromise().then((value: any) => {
      this.reservas = value as ReservaDto[];
      console.log(this.reservas)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los automoviles');
    });
  }
  
  }
  
  clearFilters() {
    this.reservaFilterFin = null;
    this.reservaFilterInicio = null;
  this.getReservasAll();
  }
  
}
