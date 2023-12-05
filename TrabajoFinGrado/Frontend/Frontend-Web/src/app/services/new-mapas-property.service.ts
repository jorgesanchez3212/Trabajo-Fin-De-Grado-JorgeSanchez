import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MapaDto } from '../models/mapa/mapa-dto';

@Injectable({
  providedIn: 'root'
})
export class NewMapasPropertyService {

  private mapaProperty: BehaviorSubject<MapaDto> = new BehaviorSubject<MapaDto>(new MapaDto());

  constructor() { }

  public getMapaPropertyObservable() : Observable<MapaDto> {
    return this.mapaProperty.asObservable();
  }

  public emitMapaProperty(mapa:MapaDto):void {
    this.mapaProperty.next(mapa);
  }


}
