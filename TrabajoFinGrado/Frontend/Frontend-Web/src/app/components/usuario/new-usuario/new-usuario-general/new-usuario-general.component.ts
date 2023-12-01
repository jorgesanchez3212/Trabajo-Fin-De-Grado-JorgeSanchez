import { Component,OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/user/user-dto/user-dto';
import { NewUsuarioPropertyService } from 'src/app/services/new-usuario-proerty.service';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-usuario-general',
  templateUrl: './new-usuario-general.component.html',
  styleUrls: ['./new-usuario-general.component.css']
})
export class NewUsuarioGeneralComponent {

  public faWarning = faExclamationTriangle;
  public usuario : UserDto;
  public roles : string[];
  selectedFile: File | null = null;
  private fileContentBase64: string | null = null;


  constructor(private newUsuarioPropertyService : NewUsuarioPropertyService){

    
    this.roles = ['CLIENTE', 'ADMINISTRADOR'];
    this.usuario = new UserDto();
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
    this.usuario.image = this.fileContentBase64;
  };
  reader.onerror = error => {
    console.error('Error al leer el archivo:', error);
  };
}

  public focusOutUsuario(){
    this.newUsuarioPropertyService.emitUsuarioProperty(this.usuario);
  }

  public focusOutRoles(){
    this.newUsuarioPropertyService.emitUsuarioProperty(this.usuario);
  }

}

