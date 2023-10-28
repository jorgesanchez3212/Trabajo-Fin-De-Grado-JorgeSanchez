import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AutomovilesComponent } from './components/automoviles/automoviles.component';

const routes: Routes = [
  {path: '',redirectTo: 'login',pathMatch: 'full'},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'automoviles',component: AutomovilesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
