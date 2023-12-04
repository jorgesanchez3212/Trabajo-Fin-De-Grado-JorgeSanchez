export class ReservaDto {
    public id: string;
    public automovilId: string;
    public clienteId: string;
    public fechaInicio: string;
    public fechaFin : string;
    public costo : string;
    public recogidoPorCliente : boolean;
  
    constructor() {
      this.id = '';
      this.automovilId = '';
      this.clienteId = '';
      this.fechaInicio = '';
      this.fechaFin = '';
      this.costo = '';
      this.recogidoPorCliente = false;
    }
  }
  