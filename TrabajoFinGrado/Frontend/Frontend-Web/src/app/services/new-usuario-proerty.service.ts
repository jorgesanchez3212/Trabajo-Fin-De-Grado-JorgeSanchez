import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from '../models/user/user-dto/user-dto';

@Injectable({
  providedIn: 'root'
})
export class NewUsuarioPropertyService {

  private usuarioProperty: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>(new UserDto());
  private fileProperty : BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);

  constructor() { }

  public getUsuarioPropertyObservable():Observable<UserDto> {
    return this.usuarioProperty.asObservable();
  }

  public emitUsuarioProperty(usuario:UserDto):void {
    this.usuarioProperty.next(usuario);
  }

  public getFilePropertyObservable():Observable<File | null> {
    return this.fileProperty.asObservable();
  }

  public emitFileProperty(file:File | null):void {
    this.fileProperty.next(file);
  }

}
