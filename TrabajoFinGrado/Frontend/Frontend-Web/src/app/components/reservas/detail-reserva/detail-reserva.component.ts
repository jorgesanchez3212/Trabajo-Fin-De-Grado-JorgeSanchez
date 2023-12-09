import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faFilePdf, faTimes, faInfo, faSave } from '@fortawesome/free-solid-svg-icons';
import { ReservaDto } from 'src/app/models/reserva/reserva-dto';
import { ReservaUpdateDto } from 'src/app/models/reserva/reserva-update-dto';
import { NewReservaPropertyService } from 'src/app/services/new-reserva-property.service';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-detail-reserva',
  templateUrl: './detail-reserva.component.html',
  styleUrls: ['./detail-reserva.component.css']
})
export class DetailReservaComponent {
  public reserva : ReservaDto;
  public reservaUpdate : ReservaUpdateDto;
  
  public faFilePdf = faFilePdf;
  public faTimes = faTimes;
  public faInfo = faInfo;
  public faFloppy = faSave;

  constructor(private httpClient: HttpClient, private utilsService : UtilsService, @Inject(MAT_DIALOG_DATA) private data: any,  private newReservaPropertyService: NewReservaPropertyService,
  private dialogRef: MatDialogRef<DetailReservaComponent>){

    this.reserva = data.reserva;
    this.reservaUpdate = new ReservaUpdateDto();

  }

  ngOnInit(): void {
    this.loadData();
    this.listenReserva();
  }

  private loadData(){
    this.newReservaPropertyService.emitReservaProperty(this.reserva);
  }

  private listenReserva(){
    this.newReservaPropertyService.getReservaPropertyObservable().subscribe((reserva:ReservaDto)=>{
      this.reserva = reserva;
      this.reservaUpdate.id = reserva.id;
      this.reservaUpdate.automovilId = reserva.automovilId;
      this.reservaUpdate.clienteId = reserva.clienteId;
      this.reservaUpdate.fechaInicio = reserva.fechaInicio;
      this.reservaUpdate.fechaFin = reserva.fechaFin;
      this.reservaUpdate.costo = reserva.costo;
      this.reservaUpdate.recogidoPorCliente = reserva.recogidoPorCliente;
    });
  }


  public async saveReserva(){
    //const url: string = 'http://localhost:6969/api/reservas/update';
    const url: string = 'https://alquilaenmadrid.com/api/reservas/update';


    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.httpClient.put(url, this.reservaUpdate, { headers }).toPromise().then((response: any) => {
        console.log('Reserva updateado correctamente');
        this.utilsService.alert('success','Se ha actualizado correctamente');
        this.dialogRef.close();
      }).catch((error) => {
        console.error('Se ha producido un error al updatear la reserva:', error);
      });
    }
  }
}
