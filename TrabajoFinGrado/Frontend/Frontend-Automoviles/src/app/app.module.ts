import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NgModule } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Routing 
import { AppRoutingModule } from './app-routing.module';


// Components
import { AppComponent } from './app.component';
import { LoginPage } from './components/login/login.page';
import { RegisterPage } from './components/register/register.page';
import { NavbarPage } from './components/navbar/navbar.page';
import { CatalogoPage } from './components/catalogo/catalogo.page';
import { AboutusPage } from './components/aboutus/aboutus.page';
import { ContactoPage } from './components/contacto/contacto.page';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    RegisterPage,
    NavbarPage,
    CatalogoPage,
    AboutusPage,
    ContactoPage
  ],
  imports: [
    BrowserModule,
    CommonModule,     
    FormsModule,      
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
