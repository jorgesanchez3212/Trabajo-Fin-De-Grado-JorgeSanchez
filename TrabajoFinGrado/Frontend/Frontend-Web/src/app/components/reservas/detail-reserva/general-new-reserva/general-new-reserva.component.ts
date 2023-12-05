import { formatDate } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ReservaDto } from 'src/app/models/reserva/reserva-dto';
import { NewReservaPropertyService } from 'src/app/services/new-reserva-property.service';


@Component({
  selector: 'app-general-new-reserva',
  templateUrl: './general-new-reserva.component.html',
  styleUrls: ['./general-new-reserva.component.css']
})
export class GeneralNewReservaComponent {
  public faWarning = faExclamationTriangle;
  public reserva : ReservaDto;
  public reservaFilterFin: Date | null = null;
  public reservaFilterInicio: Date | null = null;
  
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

  constructor(private newReservaPropertyService : NewReservaPropertyService){

        this.reserva = new ReservaDto();
  }



  ngOnInit(): void {
    this.listenReserva()
  }

  private listenReserva(){
    this.newReservaPropertyService.getReservaPropertyObservable().subscribe((reserva:ReservaDto) => {
      this.reserva = reserva;
      // Convertir fechaInicio de string a Date
      if (reserva.fechaInicio) {
        this.reservaFilterInicio = new Date(reserva.fechaInicio);
    } else {
        this.reservaFilterInicio = null;
    }

    // Convertir fechaFin de string a Date
    if (reserva.fechaFin) {
        this.reservaFilterFin = new Date(reserva.fechaFin);
    } else {
        this.reservaFilterFin = null;
    }
});
  }

  public focusOutAutomovil(){
        // Para fechaFin
if (this.reservaFilterFin) {
  this.reserva.fechaFin = formatDate(this.reservaFilterFin, 'yyyy-MM-dd', 'en-US');
} else {
  this.reserva.fechaFin = null;
}

// Para fechaInicio
if (this.reservaFilterInicio) {
  this.reserva.fechaInicio = formatDate(this.reservaFilterInicio, 'yyyy-MM-dd', 'en-US');
} else {
  this.reserva.fechaInicio = null;
}
    


this.newReservaPropertyService.emitReservaProperty(this.reserva);
console.log(this.reserva)
  }


}
