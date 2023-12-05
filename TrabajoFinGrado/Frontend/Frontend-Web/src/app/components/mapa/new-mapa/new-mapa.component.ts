import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faFilePdf, faTimes, faInfo, faSave } from '@fortawesome/free-solid-svg-icons';
import { MapaDto } from 'src/app/models/mapa/mapa-dto';
import { NewMapasPropertyService } from 'src/app/services/new-mapas-property.service';

@Component({
  selector: 'app-new-mapa',
  templateUrl: './new-mapa.component.html',
  styleUrls: ['./new-mapa.component.css']
})
export class NewMapaComponent {
  public mapa : MapaDto;
  
  public faFilePdf = faFilePdf;
  public faTimes = faTimes;
  public faInfo = faInfo;
  public faFloppy = faSave;

  constructor(private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) private data: any,  private newMapaPropertyService: NewMapasPropertyService,
  private dialogRef: MatDialogRef<NewMapaComponent>){

    this.mapa = data.automovil;

  }

  ngOnInit(): void {
    this.listenMapa();
  }

  private listenMapa(){
    this.newMapaPropertyService.getMapaPropertyObservable().subscribe((mapa:MapaDto)=>{
      this.mapa = mapa;
    });
  }


  
  public async saveMapa(){
    const url: string = 'http://localhost:6969/api/mapas/newMapas';
    //const url: string = 'http://128.140.34.184:8080/api/mapas/newMapas';


    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.httpClient.post(url, this.mapa, { headers }).toPromise().then((response: any) => {
        console.log('Mapa insertar correctamente');
        this.dialogRef.close();
      }).catch((error) => {
        console.error('Se ha producido un error al insertar el mapa:', error);
      });
    }
  }
}
