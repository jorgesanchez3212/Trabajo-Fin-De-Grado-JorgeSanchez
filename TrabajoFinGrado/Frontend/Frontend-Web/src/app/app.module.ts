
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
    MatExpansionModule

  ],
  exports:[NavegacionComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
