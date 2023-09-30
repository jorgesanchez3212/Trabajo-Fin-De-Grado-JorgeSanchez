import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Models
import { Login } from 'src/app/models/login/login';
import { UserToken } from 'src/app/models/user/user-token/user-token';
import { UserCreate } from 'src/app/models/user/user-create/user-create';

import { Observable } from 'rxjs';



const DIR = 'http://localhost:6969/api/users'
@Injectable({
  providedIn: 'root'
})
export class UserRestServiceService {

  constructor(private httpClient : HttpClient) { }


  public login(login : Login) : Observable<UserToken>{
    return this.httpClient.post<UserToken>(DIR + '/login', login);
  }

  public userRegister(register: UserCreate): Observable<UserToken> {
    return this.httpClient.post<UserToken>(DIR + '/register', register)
  }

  



}
