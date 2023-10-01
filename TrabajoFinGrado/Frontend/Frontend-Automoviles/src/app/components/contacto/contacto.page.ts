import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage  {

  constructor(private router : Router) { }

  aboutus(){
    this.router.navigateByUrl('/aboutus');
  }

}
