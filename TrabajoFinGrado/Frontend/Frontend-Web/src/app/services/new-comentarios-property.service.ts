import { Injectable } from '@angular/core';
import { ComentarioDto } from '../models/comentario/comentario-dto/comentario-dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewComentariosPropertyService {
  private comentarioProperty: BehaviorSubject<ComentarioDto[]> = new BehaviorSubject<ComentarioDto[]>([]);
  private stringProperty: BehaviorSubject<string> = new BehaviorSubject<string>("");


  constructor() { }

  public getComentarioPropertyObservable() : Observable<ComentarioDto[]> {
    return this.comentarioProperty.asObservable();
  }

  public emitComentarioProperty(comentario:ComentarioDto[]):void {
    this.comentarioProperty.next(comentario);
  }

  public getStringPropertyObservable() : Observable<string> {
    return this.stringProperty.asObservable();
  }

  public emitStringProperty(comentario:string):void {
    this.stringProperty.next(comentario);
  }
}
