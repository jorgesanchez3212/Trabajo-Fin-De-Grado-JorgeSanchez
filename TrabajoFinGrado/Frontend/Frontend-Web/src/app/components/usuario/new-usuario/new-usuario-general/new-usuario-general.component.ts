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
  
  constructor(private newUsuarioPropertyService : NewUsuarioPropertyService){

    
    this.roles = ['CLIENTE', 'ADMINISTRADOR'];
    this.usuario = new UserDto();
  }
  
  ngOnInit(): void {
  }

  

  public focusOutUsuario(){
    this.newUsuarioPropertyService.emitUsuarioProperty(this.usuario);

  }

  public focusOutRoles(){
    this.newUsuarioPropertyService.emitUsuarioProperty(this.usuario);

  }

}

