import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservaDto } from 'src/app/models/reserva/reserva-dto';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogAnimationsComponent } from '../automoviles/dialog-animations/dialog-animations.component';
import jsPDF from 'jspdf';
import { UserDto } from 'src/app/models/user/user-dto/user-dto';
import { AutomovilDto } from 'src/app/models/automovil/automovil-dto/automovil-dto';

@Component({
  selector: 'app-misreservas',
  templateUrl: './misreservas.component.html',
  styleUrls: ['./misreservas.component.css']
})
export class MisreservasComponent {
  public usuario : UserDto;
  public automovil : AutomovilDto | undefined = new AutomovilDto();
  public reservas : ReservaDto[]
  public reserva : ReservaDto;
  public isReservasIsNull = false;
  httpClient: any;

  
  constructor(private httpService: HttpClient, private utilsService : UtilsService, public dialog: MatDialog){
    this.reservas = [];
    this.reserva = new ReservaDto();
    this.usuario = new UserDto();
   
  }


  ngOnInit(): void {
    let id = localStorage.getItem('access_id');
    if(id === null){
      id = '0'
    }
    this.getReservasAllByClienteId(id);
    this.findUsuario(id);
  }


  private getReservasAllByClienteId(id:string){
    //const url : string = `http://128.140.34.184:8080/api/reservas/listaReservasByClienteId/${id}`
    const url : string = `http://localhost:6969/api/reservas/listaReservasByClienteId/${id}`

    const token = localStorage.getItem('access_token');


    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.httpService.get(url).toPromise().then((value: any) => {
      this.reservas = value as ReservaDto[];
      if(this.reservas.length === 0){
        this.isReservasIsNull = true;
      }else{
        this.isReservasIsNull = false;
      }
      console.log(this.reservas)
    }).catch((error) => {
      
      console.log('Se ha producido un error al obtener los reservas');
    });
  }
  }

  openDialog(id : string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'Si') {
          this.deleteReservaById(id);
          this.utilsService.alert('success','Se ha anulado la reserva correctamente');
          let idd = localStorage.getItem('access_id');
          if(idd === null){
            idd = '0'
          }
          this.getReservasAllByClienteId(idd);
        } else {
          console.log("Reserva borrado")
        }
      }
    });
  }

  private deleteReservaById(id: string) {
    const url: string = `http://localhost:6969/api/reservas/delete/${id}`; 

    const token = localStorage.getItem('access_token');
  
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      this.httpService.post(url, { headers }).toPromise().then((response: any) => {
        console.log('Reserva eliminada correctamente');
        this.getReservasAllByClienteId(id);
      }).catch((error) => {
        console.error('Se ha producido un error al eliminar la reserva:', error);
      });
    }
    this.getReservasAllByClienteId(id);
  }


    async generarPDF(reservaa : ReservaDto) {

      this.automovil = await this.findAutmovil(reservaa.automovilId);

      const doc = new jsPDF();
      doc.setFontSize(22); // Tamaño de fuente grande
      doc.setFont('helvetica', 'bold'); // Fuente en negrita
      // Añade contenido al PDF
      doc.text('Reserva', 10, 10);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`ID Reserva:  ${reservaa.id}`, 10, 20);

      doc.setFontSize(16); // Tamaño de fuente grande
      doc.setFont('helvetica', 'bold'); // Fuente en negrita
      doc.text('Cliente', 10, 60);


      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nombre del Cliente:  ${this.usuario.nombre}`, 10, 70);
      doc.text(`Email del Cliente:  ${this.usuario.email}`, 10, 80);
      doc.text(`Username del Cliente:  ${this.usuario.username}`, 10, 90);

      doc.setFontSize(16); // Tamaño de fuente grande
      doc.setFont('helvetica', 'bold'); // Fuente en negrita
      doc.text('Automovil', 10, 110);


      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Marca del Automovil:  ${this.automovil!.marca}`, 10, 120);
      doc.text(`Modelo del Automovil:  ${this.automovil!.modelo}`, 10, 130);
      doc.text(`Color del Automovil:  ${this.automovil!.color}`, 10, 140);
      doc.text(`Tipo de Automovil:  ${this.automovil!.tipo}`, 10, 150);




      // Descarga el PDF
      doc.save('reserva.pdf');
      this.utilsService.alert('success','Se ha descargado el pdf correctamente');

    }

    public async findUsuario(id :string){
      const url: string = `http://localhost:6969/api/users/find/${id}`;
      //const url: string = `http://128.140.34.184:8080/api/users/find/${id}`; 
  
  
      const token = localStorage.getItem('access_token');
  
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
  
        this.httpService.get(url).toPromise().then((data: any) => {
          console.log(data);
          this.usuario = data as UserDto;
        }).catch((error) => {
          console.error('Se ha producido un error al recuperar el usuario:', error);
        });
      }
    }


    private async findAutmovil(id: string): Promise<AutomovilDto | undefined> {
      const url: string = `http://localhost:6969/api/automoviles/find/${id}`;
      const token = localStorage.getItem('access_token');
    
      if (!token) {
        console.error('Token no disponible');
        return undefined;
      }
    
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    
      try {
        const response = await this.httpService.get(url, { headers }).toPromise();
        console.log('Automovil encontrado correctamente');
        return response as AutomovilDto;
      } catch (error) {
        console.error('Se ha producido un error al encontrar el automovil:', error);
        return undefined;
      }
    }
  
    
  
  
  
}
