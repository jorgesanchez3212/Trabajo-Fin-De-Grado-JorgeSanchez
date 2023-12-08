import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faFilePdf, faTimes, faInfo, faSave } from '@fortawesome/free-solid-svg-icons';
import { MapaDto } from 'src/app/models/mapa/mapa-dto';
import { NewMapasPropertyService } from 'src/app/services/new-mapas-property.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-detail-mapa-component',
  templateUrl: './detail-mapa-component.component.html',
  styleUrls: ['./detail-mapa-component.component.css']
})
export class DetailMapaComponentComponent {
  public mapa : MapaDto;
  
  public faFilePdf = faFilePdf;
  public faTimes = faTimes;
  public faInfo = faInfo;
  public faFloppy = faSave;

  constructor(private httpClient: HttpClient, private utilsService : UtilsService ,@Inject(MAT_DIALOG_DATA) private data: any,  private newMapaPropertyService: NewMapasPropertyService,
  private dialogRef: MatDialogRef<DetailMapaComponentComponent>){

    this.mapa = data.mapa;

  }

  ngOnInit(): void {
    this.loadData();
    this.listenMapa();
  }
  
  private loadData(){
    this.newMapaPropertyService.emitMapaProperty(this.mapa);
  }

  private listenMapa(){
    this.newMapaPropertyService.getMapaPropertyObservable().subscribe((mapa:MapaDto)=>{
      this.mapa = mapa;
    });
  }


  
  public async saveMapa(){
    const url: string = 'http://localhost:6969/api/mapas/update';
    //const url: string = 'http://128.140.34.184:8080/api/mapas/update';


    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.httpClient.put(url, this.mapa, { headers }).toPromise().then((response: any) => {
        console.log('Mapa updateado correctamente');
        this.utilsService.alert('success','Se ha actualizado el mapa correctamente');
        this.dialogRef.close();
      }).catch((error) => {
        console.error('Se ha producido un error al updatear el mapa:', error);
      });
    }
  }
}
