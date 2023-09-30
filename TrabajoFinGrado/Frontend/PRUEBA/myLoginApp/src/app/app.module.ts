import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing/app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from './views/login/login.page';
import { RegisterPage } from './views/register/register.page';
import { CatalogoPage } from './views/catalogo/catalogo.page';
import { NavbarComponent } from './views/navbar/navbar.page';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    RegisterPage,
    CatalogoPage,
    NavbarComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
