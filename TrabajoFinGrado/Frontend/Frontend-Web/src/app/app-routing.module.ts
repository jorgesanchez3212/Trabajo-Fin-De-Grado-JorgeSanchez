import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AutomovilesComponent } from './components/automoviles/automoviles.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MisreservasComponent } from './components/misreservas/misreservas.component';
import { MisvaloracionesComponent } from './components/misvaloraciones/misvaloraciones.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

const routes: Routes = [
  {path: '',redirectTo: 'login',pathMatch: 'full'},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'automovil',component: AutomovilesComponent},
  {path:'usuarios',component: UsuarioComponent},
  {path:'comentarios',component: ComentarioComponent},
  {path:'reservas',component: ReservasComponent},
  {path:'perfil',component: PerfilComponent},
  {path:'misreservas',component: MisreservasComponent},
  {path:'misvaloraciones',component: MisvaloracionesComponent},
  {path:'mapas',component: MapaComponent},
  {path:'contacto',component: ContactoComponent},
  {path:'catalogo',component: CatalogoComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
