import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReservaDto } from '../models/reserva/reserva-dto';

@Injectable({
  providedIn: 'root'
})
export class NewReservaPropertyService {

  private reservaProperty: BehaviorSubject<ReservaDto> = new BehaviorSubject<ReservaDto>(new ReservaDto());

  constructor() { }

  public getReservaPropertyObservable():Observable<ReservaDto> {
    return this.reservaProperty.asObservable();
  }

  public emitReservaProperty(reserva:ReservaDto):void {
    this.reservaProperty.next(reserva);
  }


}
