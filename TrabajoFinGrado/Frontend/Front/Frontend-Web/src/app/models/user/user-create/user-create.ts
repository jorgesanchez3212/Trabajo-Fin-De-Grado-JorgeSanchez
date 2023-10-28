export class UserCreate {
    public nombre: string;
    public rol: string;
    public email: string;
    public image: string | null;
    public password: string;
    public username: string;
    public description : string;
  
    constructor(){
      this.nombre ='';
      this.email ='';
      this.username ='';
      this.image = null ;
      this.rol ='CLIENTE';
      this.password ='';
      this.description ='';
    }
  }
  