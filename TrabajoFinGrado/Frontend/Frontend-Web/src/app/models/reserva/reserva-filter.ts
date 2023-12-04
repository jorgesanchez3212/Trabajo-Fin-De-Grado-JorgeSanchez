export class ReservaFilter {
    public id: string | null;
    public automovilId: string | null;
    public clienteId: string | null;
    public fechaInicio: string| null;
    public fechaFin : string | null;
    public costo : string | null;
    public recogidoPorCliente : boolean | null;
  
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
  