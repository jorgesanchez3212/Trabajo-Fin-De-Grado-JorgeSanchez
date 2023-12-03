import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolPropertyService {


  private rolProperty: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  public getRolPropertyObservable():Observable<string> {
    return this.rolProperty.asObservable();
  }

  public emitRolProperty(rol:string):void {
    this.rolProperty.next(rol);
  }

}
