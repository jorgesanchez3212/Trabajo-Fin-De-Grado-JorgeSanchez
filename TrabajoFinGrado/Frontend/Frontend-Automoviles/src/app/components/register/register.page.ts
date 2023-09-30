import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { UserToken } from 'src/app/models/user/user-token/user-token';

// Services
import { UserRestServiceService } from 'src/app/services/user.rest.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  nombre: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  description: string = '';

  constructor(private route : Router,
    private userService: UserRestServiceService
    ) { }

    register(){
      if (this.nombre && this.username && this.description && this.email && this.password && this.password === this.confirmPassword) {
          const userData = {
              nombre: this.nombre,
              email: this.email,
              username: this.username,
              image : null,
              rol : 'CLIENTE',
              password: this.password,
              description: this.description,
          };
  
          this.userService.userRegister(userData).subscribe(
              (response: UserToken) => {
                  console.log('Usuario registrado!', response);
                  this.route.navigateByUrl('/login');
              },
              (error) => {
                  console.error('Error de registro', error);
              }
          );
      } else {
          console.log('Error de registro: Verifica los datos del formulario');
      }
  }
}
