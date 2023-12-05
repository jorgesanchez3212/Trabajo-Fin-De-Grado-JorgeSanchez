import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login/login';
import { UserToken } from 'src/app/models/user/user-token/user-token';
import { RolPropertyService } from 'src/app/services/rol-property.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isLoading = false;
  public error = false;
  public fail = false;
  public showSpinner = false;

  public username:string='';
  public password:string='';

  loginForm = this.formBuilder.group({
    username:"",
    password:'',
  });

  private loginF:Login = new Login(this.loginForm.value.username!,this.loginForm.value.password!);

  constructor(private formBuilder: FormBuilder, private utilsService : UtilsService, private userService: UserRestService, private router:Router,
    private rolPropertyService: RolPropertyService
    ){}
  ngOnInit(): void {
    localStorage.clear;
  }

  public login():void{
    this.isLoading = true;
    this.error = false;
    this.fail=false;
    this.showSpinner = true;

    this.loginF.setUsername(this.loginForm.value.username!);
    this.loginF.setPassword(this.loginForm.value.password!);

    var that = this;
    console.log(this.loginF);

    this.userService.login(this.loginF).subscribe(
      (response: UserToken) => {
        console.log('Usuario autenticado!', response);
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('access_rol', response.user.rol);
        localStorage.setItem('access_id', response.user.id);
        this.rolPropertyService.emitRolProperty(response.user.rol);
        this.router.navigateByUrl('/automovil');
      },
      (error) => {
        console.error('Error de autenticación.', error);
      that.error = true;
      that.isLoading = false;
      that.loginF.setUsername("");
      that.loginF.setPassword("");
      that.loginForm.controls.username.setValue("");
      that.loginForm.controls.password.setValue("");
      error.status = 901;
      that.utilsService.alert("error","Error de autenticación");
      })
  }
}
