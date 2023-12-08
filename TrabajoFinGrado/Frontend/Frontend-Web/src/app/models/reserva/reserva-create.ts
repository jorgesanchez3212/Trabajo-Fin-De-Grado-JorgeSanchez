export class ReservaCreateDto {
    public automovilId: string;
    public clienteId: string;
    public fechaInicio: string;
    public fechaFin : string;
    public costo : string;
    public recogidoPorCliente : boolean;
  
    constructor() {
      this.automovilId = '';
      this.clienteId = '';
      this.fechaInicio = '';
      this.fechaFin = '';
      this.costo = '';
      this.recogidoPorCliente = false;
    }
  }