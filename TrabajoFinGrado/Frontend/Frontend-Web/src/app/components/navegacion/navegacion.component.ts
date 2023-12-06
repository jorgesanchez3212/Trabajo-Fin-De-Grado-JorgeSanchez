import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { faUser, faUsers, faCar,faLeaf,faBuilding } from '@fortawesome/free-solid-svg-icons';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { RolPropertyService } from 'src/app/services/rol-property.service';


@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],

})
export class NavegacionComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  isNavbarVisible: boolean = false;
  isAdminVisible : boolean = false;



  fillerNav = [
    {name:"Iniciar sesion", route : "automovil", icon:"home"},
    {name:"Catalogo", route : "", icon:"home"},
    {name:"Mi Perfil", route : "perfil", icon:"account_circle"},
    {name:"Mis Reservas", route : "misreservas", icon:"perm_contact_calendar"},
    {name:"Mis Reservas", route : "misvaloraciones", icon:"perm_contact_calendar"},
    {name:"Usuarios", route : "usuarios", icon:"group"},
    {name:"Automoviles", route : "automovil", icon:"directions_car"},
    {name:"Comentarios", route : "comentarios", icon:"group"},
    {name:"Reservas", route : "reservas", icon:"group"},
    {name:"Tiendas", route : "mapas", icon:"home"},
    {name:"Contacto", route : "contacto", icon:"perm_contact_calendar"},
  ]


  fillerContent = Array.from({length: 50}, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private location: Location, private rolPropertyService: RolPropertyService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   
    const rol = localStorage.getItem('access_rol');
      if(rol === 'ADMINISTRADOR'){
        this.isAdminVisible = true
      }else{
        this.isAdminVisible = false
      }
  

    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Ruta actual:', event.url);
        this.isNavbarVisible = event.url !== '/login' && event.url !== '/register' && event.url !== '/';
      }
    });
  }
  ngOnInit(): void {
    this.rolPropertyService.getRolPropertyObservable().subscribe(rol => {
      if(rol.includes('ADMINISTRADOR') ){
        this.isAdminVisible = true
      }else if(rol.includes('CLIENTE')){
        this.isAdminVisible = false
      }else{
        const rol = localStorage.getItem('access_rol');
        if(rol === 'ADMINISTRADOR'){
          this.isAdminVisible = true
        }else{
          this.isAdminVisible = false
        }
      }
      
    });
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
