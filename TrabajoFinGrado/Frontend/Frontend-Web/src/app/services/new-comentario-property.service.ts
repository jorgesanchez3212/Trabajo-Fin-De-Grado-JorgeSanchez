import { Injectable } from '@angular/core';
import { ComentarioDto } from '../models/comentario/comentario-dto/comentario-dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewComentarioPropertyService {

  private comentarioProperty: BehaviorSubject<ComentarioDto> = new BehaviorSubject<ComentarioDto>(new ComentarioDto());

  constructor() { }

  public getComentarioPropertyObservable() : Observable<ComentarioDto> {
    return this.comentarioProperty.asObservable();
  }

  public emitComentarioProperty(comentario:ComentarioDto):void {
    this.comentarioProperty.next(comentario);
  }
}
