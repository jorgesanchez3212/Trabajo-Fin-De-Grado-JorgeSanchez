import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservaDto } from 'src/app/models/reserva/reserva-dto';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogAnimationsComponent } from '../automoviles/dialog-animations/dialog-animations.component';

@Component({
  selector: 'app-misreservas',
  templateUrl: './misreservas.component.html',
  styleUrls: ['./misreservas.component.css']
})
export class MisreservasComponent {
  public reservas : ReservaDto[]
  public reserva : ReservaDto;
  public isReservasIsNull = false;

  
  constructor(private httpService: HttpClient, private utilsService : UtilsService, public dialog: MatDialog){
    this.reservas = [];
    this.reserva = new ReservaDto();
   
  }


  ngOnInit(): void {
    let id = localStorage.getItem('access_id');
    if(id === null){
      id = '0'
    }
    this.getReservasAllByClienteId(id);
  }


  private getReservasAllByClienteId(id:string){
    //const url : string = `http://128.140.34.184:8080/api/reservas/listaReservasByClienteId/${id}`
    const url : string = `http://localhost:6969/api/reservas/listaReservasByClienteId/${id}`

    const token = localStorage.getItem('access_token');


    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.httpService.get(url).toPromise().then((value: any) => {
      this.reservas = value as ReservaDto[];
      if(this.reservas.length === 0){
        this.isReservasIsNull = true;
      }else{
        this.isReservasIsNull = false;
      }
      console.log(this.reservas)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los reservas');
    });
  }
  }

  openDialog(id : string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'Si') {
          this.deleteReservaById(id);
        } else {
          console.log("Automovil borrado")
        }
      }
    });
  }

  private deleteReservaById(id: string) {
    const url: string = `http://localhost:6969/api/reservas/delete/${id}`; 

    const token = localStorage.getItem('access_token');
  
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      this.httpService.post(url, { headers }).toPromise().then((response: any) => {
        console.log('Reserva eliminada correctamente');
        this.getReservasAllByClienteId(id);
      }).catch((error) => {
        console.error('Se ha producido un error al eliminar la reserva:', error);
      });
    }
    this.getReservasAllByClienteId(id);
  }
}
