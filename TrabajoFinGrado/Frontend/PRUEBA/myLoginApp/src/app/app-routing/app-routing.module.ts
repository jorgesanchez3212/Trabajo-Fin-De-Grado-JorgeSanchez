import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from '../views/login/login.page';
import { RegisterPage } from '../views/register/register.page';
import { CatalogoPage } from '../views/catalogo/catalogo.page';
import { NavbarComponent } from '../views/navbar/navbar.page';


const routes: Routes = [
  { path: '', redirectTo: 'navbar', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },   
  { path: 'catalogo', component: CatalogoPage },
  {path:'navbar', component: NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
