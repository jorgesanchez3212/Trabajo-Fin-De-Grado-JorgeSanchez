import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/user/user-token/user-token';
import { UserRestServiceService } from 'src/app/services/user.rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  isFormValid: boolean = false;

  constructor(
    private router: Router,
    private userService: UserRestServiceService
  ) {}

  login() {
    if (this.isFormValid) {
      // Crear objeto de datos de inicio de sesión
      const loginData = {
        username: this.username,
        password: this.password,
      };

      // Llamar al servicio de inicio de sesión
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
    } else {
      // El formulario no es válido, puedes mostrar un mensaje de error si lo deseas
      console.error('Error de autenticación. Completa ambos campos.');
    }
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  // Esta función se llama cada vez que cambia el valor de los campos de entrada
  validarFormulario() {
    // Verifica si ambos campos tienen contenido
    this.isFormValid = this.username.trim() !== '' && this.password.trim() !== '';
  }
}
