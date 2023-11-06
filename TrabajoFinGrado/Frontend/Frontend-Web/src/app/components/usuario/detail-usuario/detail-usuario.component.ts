import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDto } from 'src/app/models/user/user-dto/user-dto';
import { NewUsuarioPropertyService } from 'src/app/services/new-usuario-proerty.service';
import { faFilePdf, faTimes, faInfo, faSave } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-detail-usuario',
  templateUrl: './detail-usuario.component.html',
  styleUrls: ['./detail-usuario.component.css']
})
export class DetailUsuarioComponent implements OnInit{

  public usuario : UserDto;
  
  public faFilePdf = faFilePdf;
  public faTimes = faTimes;
  public faInfo = faInfo;
  public faFloppy = faSave;

  constructor(private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) private data: any,  private newUsuarioPropertyService: NewUsuarioPropertyService,
  private dialogRef: MatDialogRef<DetailUsuarioComponent>){

    this.usuario = data.usuario;

  }
  ngOnInit(): void {
    this.loadData();
    this.listenUsuario();
  }

  private loadData(){
    this.newUsuarioPropertyService.emitUsuarioProperty(this.usuario);
  }

  private listenUsuario(){
    this.newUsuarioPropertyService.getUsuarioPropertyObservable().subscribe((usuario:UserDto)=>{
      this.usuario = usuario;
    });
  }

  public async saveUsuario(){
    const url: string = 'http://localhost:6969/api/users/update';

    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.httpClient.put(url, this.usuario, { headers }).toPromise().then((response: any) => {
        console.log('Usuario updateado correctamente');
      }).catch((error) => {
        console.error('Se ha producido un error al eliminar el usuario:', error);
      });
    }
  }
}
