import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faFilePdf, faTimes, faInfo, faSave } from '@fortawesome/free-solid-svg-icons';
import { AutomovilDto } from 'src/app/models/automovil/automovil-dto/automovil-dto';
import { AutomovilUpdate } from 'src/app/models/automovil/automovil-update/automovil-update';
import { NewAutomovilPropertyService } from 'src/app/services/new-automovil-property.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-detail-automovil',
  templateUrl: './detail-automovil.component.html',
  styleUrls: ['./detail-automovil.component.css']
})
export class DetailAutomovilComponent {
  public automovil : AutomovilDto;
  public automovilUpdate : AutomovilUpdate;
  
  public faFilePdf = faFilePdf;
  public faTimes = faTimes;
  public faInfo = faInfo;
  public faFloppy = faSave;

  constructor(private httpClient: HttpClient, private utilsService : UtilsService,@Inject(MAT_DIALOG_DATA) private data: any,  private newAutomovilPropertyService: NewAutomovilPropertyService,
  private dialogRef: MatDialogRef<DetailAutomovilComponent>){

    this.automovil = data.automovil;
    this.automovilUpdate = new AutomovilUpdate();

  }
  ngOnInit(): void {
    this.loadData();
    this.listenUsuario();
  }

  private loadData(){
    this.newAutomovilPropertyService.emitAutomovilProperty(this.automovil);
  }

  private listenUsuario(){
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
  }

  public async saveAutomovil(){
    const url: string = 'http://localhost:6969/api/automoviles/update';
    //const url: string = 'http://128.140.34.184:8080/api/automoviles/update';


    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.httpClient.put(url, this.automovilUpdate, { headers }).toPromise().then((response: any) => {
        console.log('Automovil updateado correctamente');
        this.utilsService.alert('success','Se ha actualizado el automovil correctamente');

        this.dialogRef.close();
      }).catch((error) => {
        console.error('Se ha producido un error al updatear el automovil:', error);
      });
    }
  }
}
