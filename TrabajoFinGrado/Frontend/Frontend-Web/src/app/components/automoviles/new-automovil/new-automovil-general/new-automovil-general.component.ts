import { Component,OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { AutomovilDto } from 'src/app/models/automovil/automovil-dto/automovil-dto';
import { NewAutomovilPropertyService } from 'src/app/services/new-automovil-property.service';

@Component({
  selector: 'app-new-automovil-general',
  templateUrl: './new-automovil-general.component.html',
  styleUrls: ['./new-automovil-general.component.css']
})
export class NewAutomovilGeneralComponent {


  public faWarning = faExclamationTriangle;
  public automovil : AutomovilDto;
  public tipos : string[];
  selectedFile: File | null = null;
  private fileContentBase64: string | null = null;
  public colores : string[];
  public marcas : string[];
  public capacidades : string[];


  constructor(private newAutomovilPropertyService : NewAutomovilPropertyService){

    this.capacidades = ['1', '2', '3', '4', '5'];
    this.colores = ['Blanco', 'Negro', 'Naranja', 'Rojo', 'Verde'];
    this.marcas = ['Audi', 'Mercedes', 'Porsche', 'BMW'];
    this.tipos = ['COCHE', 'CAMION', 'FURGONETA', 'MOTO'];
    this.automovil = new AutomovilDto();
  }
  
  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.convertFileToBase64(this.selectedFile);
    }
  }

private convertFileToBase64(file: File) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.fileContentBase64 = reader.result as string;
    this.automovil.image = this.fileContentBase64;
  };
  reader.onerror = error => {
    console.error('Error al leer el archivo:', error);
  };
}

  public focusOutAutomovil(){
    this.newAutomovilPropertyService.emitAutomovilProperty(this.automovil);
  }

  public focusOutTipos(){
    this.newAutomovilPropertyService.emitAutomovilProperty(this.automovil);
  }

}


