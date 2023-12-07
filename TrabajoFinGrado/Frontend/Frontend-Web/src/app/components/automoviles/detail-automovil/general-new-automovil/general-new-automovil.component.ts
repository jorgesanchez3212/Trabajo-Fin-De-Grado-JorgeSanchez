import { Component,OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { AutomovilDto } from 'src/app/models/automovil/automovil-dto/automovil-dto';
import { NewAutomovilPropertyService } from 'src/app/services/new-automovil-property.service';


@Component({
  selector: 'app-general-new-automovil',
  templateUrl: './general-new-automovil.component.html',
  styleUrls: ['./general-new-automovil.component.css']
})
export class GeneralNewAutomovilComponent {
  public faWarning = faExclamationTriangle;
  public automovil : AutomovilDto;
  public tipos : string[];
  selectedFile: File | null = null;
  private fileContentBase64: string | null = null;
  public colores : string[];
  public marcas : string[];
  public capacidades : string[];

  constructor(private newAutomovilPropertyService : NewAutomovilPropertyService){

    
    this.tipos = ['COCHE', 'CAMION', 'FURGONETA', 'MOTO'];
    this.capacidades = ['1', '2', '3', '4', '5'];
    this.colores = ['Blanco', 'Negro', 'Naranja', 'Rojo', 'Verde'];
    this.marcas = ['Audi', 'Mercedes', 'Porsche', 'BMW'];
    this.automovil = new AutomovilDto();
  }


  ngOnInit(): void {
    this.listenAutomovil()
  }

  private listenAutomovil(){
    this.newAutomovilPropertyService.getAutomovilPropertyObservable().subscribe((automovil:AutomovilDto) => {
      this.automovil = automovil;
    })
  }

  public focusOutAutomovil(){
    this.newAutomovilPropertyService.emitAutomovilProperty(this.automovil);
  }

  public focusOutTipos(){
    this.newAutomovilPropertyService.emitAutomovilProperty(this.automovil);
  }

  
}
