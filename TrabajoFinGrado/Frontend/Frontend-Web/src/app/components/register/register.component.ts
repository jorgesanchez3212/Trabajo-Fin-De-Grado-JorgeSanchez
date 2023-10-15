import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/user/user-token/user-token';
import { UserRestService } from 'src/app/services/user-rest.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public isLoading = false;
  public error = false;
  public showSpinner = false;
  public errorString = '';

  registroForm: FormGroup;

  nombre: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  description: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private userService: UserRestService,
    private router: Router
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      description: ['']
    });
  }

  public register(): void {
    this.isLoading = true;
    this.error = false;
    this.showSpinner = true;

    if (this.registroForm.valid) {
      const userData = {
        nombre: this.registroForm.value.nombre,
        email: this.registroForm.value.email,
        username: this.registroForm.value.username,
        image: null,
        rol: 'CLIENTE',
        password: this.registroForm.value.password,
        description: this.registroForm.value.descripcion,
      };

      this.userService.userRegister(userData).subscribe(
        (response: UserToken) => {
          console.log('Usuario registrado con éxito!', response);
          this.router.navigateByUrl('/login');
        },
        (error) => {
          console.error('Error en el registro de usuario.', error);
          this.error = true;
          this.isLoading = false;
          error.status = 902;
          this.utilsService.alert('error', 'Error en el registro de usuario');
        }
      );
    }else{     
      this.error = true; 
      this.errorString = "Error en los campos";    
      this.utilsService.alert('error', 'Error en los campos');

    
    }
  }
}
