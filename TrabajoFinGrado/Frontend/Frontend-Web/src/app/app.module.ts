
//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { TableModule } from 'primeng/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';






// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutomovilesComponent } from './components/automoviles/automoviles.component';
import { RouterModule } from '@angular/router';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { DialogAmimationsComponent } from './components/usuario/dialog-amimations/dialog-amimations.component';
import { DetailUsuarioComponent } from './components/usuario/detail-usuario/detail-usuario.component';
import { GeneralNewUsuarioComponent } from './components/usuario/detail-usuario/general-new-usuario/general-new-usuario.component';
import { NewUsuarioComponent } from './components/usuario/new-usuario/new-usuario.component';
import { NewUsuarioGeneralComponent } from './components/usuario/new-usuario/new-usuario-general/new-usuario-general.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DialogAnimationsComponent } from './components/automoviles/dialog-animations/dialog-animations.component';
import { NewAutomovilComponent } from './components/automoviles/new-automovil/new-automovil.component';
import { DetailAutomovilComponent } from './components/automoviles/detail-automovil/detail-automovil.component';
import { NewAutomovilGeneralComponent } from './components/automoviles/new-automovil/new-automovil-general/new-automovil-general.component';
import { GeneralNewAutomovilComponent } from './components/automoviles/detail-automovil/general-new-automovil/general-new-automovil.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { DetailReservaComponent } from './components/reservas/detail-reserva/detail-reserva.component';
import { GeneralNewReservaComponent } from './components/reservas/detail-reserva/general-new-reserva/general-new-reserva.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MisreservasComponent } from './components/misreservas/misreservas.component';
import { MisvaloracionesComponent } from './components/misvaloraciones/misvaloraciones.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { DetailMapaComponentComponent } from './components/mapa/detail-mapa-component/detail-mapa-component.component';
import { NewMapaComponent } from './components/mapa/new-mapa/new-mapa.component';
import { GeneralMapaComponent } from './components/mapa/detail-mapa-component/general-mapa/general-mapa.component';
import { NewGeneralMapaComponent } from './components/mapa/new-mapa/new-general-mapa/new-general-mapa.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavegacionComponent,
    AutomovilesComponent,
    UsuarioComponent,
    DialogAmimationsComponent,
    DetailUsuarioComponent,
    GeneralNewUsuarioComponent,
    NewUsuarioComponent,
    NewUsuarioGeneralComponent,
    DialogAnimationsComponent,
    NewAutomovilComponent,
    DetailAutomovilComponent,
    NewAutomovilGeneralComponent,
    GeneralNewAutomovilComponent,
    ComentarioComponent,
    ReservasComponent,
    DetailReservaComponent,
    GeneralNewReservaComponent,
    PerfilComponent,
    MisreservasComponent,
    MisvaloracionesComponent,
    MapaComponent,
    DetailMapaComponentComponent,
    NewMapaComponent,
    GeneralMapaComponent,
    NewGeneralMapaComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,      
    MatProgressSpinnerModule, 
    BrowserAnimationsModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule, 
    MatSelectModule,
    MatExpansionModule,
    TableModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule

  ],
  exports:[NavegacionComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
