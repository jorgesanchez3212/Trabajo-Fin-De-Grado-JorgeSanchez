export class UserDto {
    public id: string;
    public nombre: string;
    public email: string;
    public username: string;
    public password : string;
    public descripcion : string;
    public rol: string;
  
    constructor() {
      this.id = '';
      this.nombre = '';
      this.email = '';
      this.username = '';
      this.password = '';
      this.descripcion = '';
      this.rol = '';
    }
  }
  