import { Component,OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/user/user-dto/user-dto';
import { NewUsuarioPropertyService } from 'src/app/services/new-usuario-proerty.service';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-general-new-usuario',
  templateUrl: './general-new-usuario.component.html',
  styleUrls: ['./general-new-usuario.component.css']
})
export class GeneralNewUsuarioComponent implements OnInit {


  public faWarning = faExclamationTriangle;
  public usuario : UserDto;
  public roles : string[];
  
  constructor(private newUsuarioPropertyService : NewUsuarioPropertyService){

    
    this.roles = ['CLIENTE', 'ADMINISTRADOR'];
    this.usuario = new UserDto();
  }
  
  ngOnInit(): void {
    this.listenUsuario()
  }

  private listenUsuario(){
    this.newUsuarioPropertyService.getUsuarioPropertyObservable().subscribe((usuario:UserDto) => {
      this.usuario = usuario;
    })
  }

  public focusOutUsuario(){
    this.newUsuarioPropertyService.emitUsuarioProperty(this.usuario);

  }

  public focusOutRoles(){
    this.newUsuarioPropertyService.emitUsuarioProperty(this.usuario);

  }

}
