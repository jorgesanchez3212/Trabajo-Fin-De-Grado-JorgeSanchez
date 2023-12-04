import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AutomovilesComponent } from './components/automoviles/automoviles.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { ReservasComponent } from './components/reservas/reservas.component';

const routes: Routes = [
  {path: '',redirectTo: 'login',pathMatch: 'full'},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'automovil',component: AutomovilesComponent},
  {path:'usuarios',component: UsuarioComponent},
  {path:'comentarios',component: ComentarioComponent},
  {path:'reservas',component: ReservasComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
