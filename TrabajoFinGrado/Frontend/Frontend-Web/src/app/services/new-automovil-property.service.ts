import { Injectable } from '@angular/core';
import { AutomovilDto } from '../models/automovil/automovil-dto/automovil-dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewAutomovilPropertyService {

  private automovilProperty: BehaviorSubject<AutomovilDto> = new BehaviorSubject<AutomovilDto>(new AutomovilDto());
  private fileProperty : BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);

  constructor() { }

  public getAutomovilPropertyObservable():Observable<AutomovilDto> {
    return this.automovilProperty.asObservable();
  }

  public emitAutomovilProperty(automovil:AutomovilDto):void {
    this.automovilProperty.next(automovil);
  }

  public getFilePropertyObservable():Observable<File | null> {
    return this.fileProperty.asObservable();
  }

  public emitFileProperty(file:File | null):void {
    this.fileProperty.next(file);
  }
}
