import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { faUser } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  // Iconos
  public faUser :any;


  isNavbarVisible: boolean = false;

  public imgSrc: string = 'assets/img/logo-oc.png';
  public navAutomovil: boolean = false;
  public navLogin: boolean = true;
  private activeTab = '';

  constructor(private router: Router, private location: Location) {
    this.faUser = faUser;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Ruta actual:', event.url);
        this.isNavbarVisible = event.url !== '/login' && event.url !== '/register';
      }
    });
  }

  ngOnInit() {
  }
}
