import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRestServiceService } from 'src/app/services/api/user/user-rest-service.service';
import { Login } from 'src/app/models/login/login';
import { UserToken } from 'src/app/models/user/user-token/user-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userService: UserRestServiceService
  ) {}

  login() {
    const loginData: Login = {
      username: this.username,
      password: this.password,
    };

    this.userService.login(loginData).subscribe(
      (response: UserToken) => {
        console.log('Usuario autenticado!', response);
        this.router.navigateByUrl('/catalogo');
      },
      (error) => {
        console.error('Error de autenticación.', error);
        // Aquí puedes agregar lógica adicional para manejar el error, 
        // como mostrar un mensaje de error en la interfaz.
      }
    );
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}


