import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { faUser, faUsers, faCar,faLeaf,faBuilding } from '@fortawesome/free-solid-svg-icons';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],

})
export class NavegacionComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  isNavbarVisible: boolean = false;

  public imgSrc: string = 'assets/img/logo-oc.png';


  fillerNav = [
    {name:"Catalogo", route : "", icon:"home"},
    {name:"Mi Perfil", route : "", icon:"account_circle"},
    {name:"Usuarios", route : "usuarios", icon:"group"},
    {name:"Automoviles", route : "automovil", icon:"directions_car"},
    {name:"Contacto", route : "", icon:"perm_contact_calendar"},
  ]


  fillerContent = Array.from({length: 50}, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private location: Location) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Ruta actual:', event.url);
        this.isNavbarVisible = event.url !== '/login' && event.url !== '/register';
      }
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;


  /*

  // Iconos
  public faUser : any;
  public faUsers : any;
  public faCars : any;
  public faLeaf : any;
  public faBuilding = faBuilding;






  isNavbarVisible: boolean = false;

  public imgSrc: string = 'assets/img/logo-oc.png';
  public navAutomovil: boolean = false;
  public navLogin: boolean = true;
  private activeTab = '';

  constructor(private router: Router, private location: Location) {
    this.faUsers = faUsers;
    this.faUser = faUser;
    this.faCars = faCar;
    this.faLeaf = faLeaf;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Ruta actual:', event.url);
        this.isNavbarVisible = event.url !== '/login' && event.url !== '/register';
      }
    });
  }

  ngOnInit() {
  }

  
  */
}
