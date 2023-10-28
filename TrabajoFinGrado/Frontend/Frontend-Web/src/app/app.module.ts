
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









// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutomovilesComponent } from './components/automoviles/automoviles.component';
import { RouterModule } from '@angular/router';
import { NavegacionComponent } from './components/navegacion/navegacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavegacionComponent,
    AutomovilesComponent
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
    RouterModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
