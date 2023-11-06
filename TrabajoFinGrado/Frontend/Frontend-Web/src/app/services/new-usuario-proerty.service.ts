import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from '../models/user/user-dto/user-dto';

@Injectable({
  providedIn: 'root'
})
export class NewUsuarioPropertyService {

  private usuarioProperty: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>(new UserDto());

  constructor() { }

  public getUsuarioPropertyObservable():Observable<UserDto> {
    return this.usuarioProperty.asObservable();
  }

  public emitUsuarioProperty(usuario:UserDto):void {
    this.usuarioProperty.next(usuario);
  }

}
