import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private route : Router) { }

  register(){
    // Lógica para registrar al usuario.
    if(this.email && this.password == this.confirmPassword){
      console.log('Usuario registrado!');
      this.route.navigateByUrl('/login');
    } else {
      console.log('Error de registro');
    }
  }

}
