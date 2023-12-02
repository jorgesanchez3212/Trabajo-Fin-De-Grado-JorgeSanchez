export class AutomovilDto {
    public id: string;
    public numeroChasis: string;
    public marca: string;
    public modelo: string;
    public color : string;
    public capacidad : string;
    public coste : string;
    public image : string | null;
    public reservas: string;
    public tipo: string;

  
    constructor() {
      this.id = '';
      this.numeroChasis = '';
      this.marca = '';
      this.modelo = '';
      this.color = '';
      this.capacidad = '';
      this.coste = '';
      this.image = null;
      this.reservas = '';
      this.tipo = '';

    }
  }