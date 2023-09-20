import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage {
  selectedContent: string = 'home';
  nombre: string = '';
  descripcion: string = '';
  email: string = '';
  imageUrl: string | ArrayBuffer = '';
  

  constructor() { }

 

}
