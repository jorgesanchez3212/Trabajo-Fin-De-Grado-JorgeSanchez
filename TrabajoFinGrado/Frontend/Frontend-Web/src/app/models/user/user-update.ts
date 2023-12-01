export class UserUpdate {
    public id : String;
    public nombre: string;
    public email: string;
    public username: string;
    public descripcion: string;
    public rol: string;
  
    constructor() {
      this.id = '';
      this.nombre = '';
      this.email = '';
      this.username = '';
      this.descripcion = '';
      this.rol = '';
    }
  }