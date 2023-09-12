import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Aquí debes agregar la lógica para autenticar al usuario.
    // Por ahora, sólo simularé una autenticación exitosa.
    if (this.email && this.password) {
      console.log('Usuario autenticado!');
      //this.router.navigateByUrl('/register');
    } else {
      console.log('Error de autenticación.');
    }
  }

  register(){
      this.router.navigateByUrl('/register')
}
}

