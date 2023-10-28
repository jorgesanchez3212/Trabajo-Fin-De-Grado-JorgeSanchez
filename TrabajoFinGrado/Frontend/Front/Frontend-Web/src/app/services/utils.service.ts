import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastr:ToastrService) { }

  
  public alert(state:string,msg:string,title:string="",timeout=4000):void{
    state = state.toLowerCase()
    if(state == "success"){
      this.toastr.success(msg,title,{timeOut:timeout});
    }
    else if(state == "error"){
      
      this.toastr.error(msg,title,{timeOut:timeout});
    }
    else if(state == "warning"){
      this.toastr.warning(msg,title,{timeOut:timeout});
    }
    else if(state == "info"){
      this.toastr.info(msg,title,{timeOut:timeout});
    }
    else{
      this.toastr.info("Tipo de alerta invalida msg: " + msg, title,{timeOut:timeout});
    }
  }
}
