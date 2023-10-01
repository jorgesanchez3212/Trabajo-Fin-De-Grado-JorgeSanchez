import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './components/login/login.page';
import { RegisterPage } from './components/register/register.page';
import { NavbarPage } from './components/navbar/navbar.page';
import { CatalogoPage } from './components/catalogo/catalogo.page';
import { AboutusPage } from './components/aboutus/aboutus.page';
import { ContactoPage } from './components/contacto/contacto.page';


const routes: Routes = [
  {path: '',redirectTo: 'catalogo',pathMatch: 'full'},
  {path:'login',component: LoginPage},
  {path:'register',component: RegisterPage},
  {path:'catalogo',component: CatalogoPage},
  {path:'aboutus',component:AboutusPage},
  {path:'contacto',component:ContactoPage},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
