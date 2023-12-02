import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faFilePdf, faTimes, faInfo, faSave } from '@fortawesome/free-solid-svg-icons';
import { AutomovilDto } from 'src/app/models/automovil/automovil-dto/automovil-dto';
import { AutomovilUpdate } from 'src/app/models/automovil/automovil-update/automovil-update';
import { NewAutomovilPropertyService } from 'src/app/services/new-automovil-property.service';


@Component({
  selector: 'app-new-automovil',
  templateUrl: './new-automovil.component.html',
  styleUrls: ['./new-automovil.component.css']
})
export class NewAutomovilComponent {
  public faFilePdf = faFilePdf;
  public faTimes = faTimes;
  public faInfo = faInfo;
  public faFloppy = faSave;


  public automovil : AutomovilDto;
  public automovilUpdate : AutomovilUpdate;

  constructor(private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) private data: any,  private newAutomovilPropertyService: NewAutomovilPropertyService,
  private dialogRef: MatDialogRef<NewAutomovilComponent>){

    this.automovil = new AutomovilDto();
    this.automovilUpdate = new AutomovilUpdate();

  }

  ngOnInit(): void {
    this.listenAutomovil();
  }



  private listenAutomovil(){
    this.newAutomovilPropertyService.getAutomovilPropertyObservable().subscribe((automovil:AutomovilDto)=>{
      this.automovil = automovil;
      this.automovilUpdate.numeroChasis = automovil.numeroChasis;
      this.automovilUpdate.marca = automovil.marca;
      this.automovilUpdate.modelo = automovil.modelo;
      this.automovilUpdate.color = automovil.color;
      this.automovilUpdate.capacidad = automovil.capacidad;
      this.automovilUpdate.coste = automovil.coste;
      this.automovilUpdate.tipo = automovil.tipo
      this.automovilUpdate.image = automovil.image
    });
    this.newAutomovilPropertyService.getFilePropertyObservable

  }


    public async saveAutomovil(){
      const url: string = 'http://localhost:6969/api/automoviles/newAutomovil';
      //const url: string = 'http://128.140.34.184:8080/api/automoviles/newAutomovil';
  
  
      const token = localStorage.getItem('access_token');
  
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
  
        this.httpClient.post(url, this.automovilUpdate, { headers }).toPromise().then((response: any) => {
          console.log('Automovil insertado correctamente');
          this.dialogRef.close();
        }).catch((error) => {
          console.error('Se ha producido un error al insertar el automovil:', error);
        });
      }
    }



    
  }


