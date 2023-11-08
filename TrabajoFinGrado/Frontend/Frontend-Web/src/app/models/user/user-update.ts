export class UserUpdate {
    public nombre: string;
    public email: string;
    public username: string;
    public descripcion: string;
    public rol: string;
  
    constructor() {
      this.nombre = '';
      this.email = '';
      this.username = '';
      this.descripcion = '';
      this.rol = '';
    }
  }