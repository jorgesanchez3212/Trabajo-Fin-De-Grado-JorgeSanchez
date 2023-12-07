export class CatalogoDto{
    public tipoAutomovil : string;
    public fechaInicio : string;
    public fechaFinal : string;
    public capacidad : string | null;
    public marca : string | null;
    public color : string | null;
    
    
    
        constructor(){
            this.tipoAutomovil = '';
            this.fechaInicio = '';
            this.fechaFinal = '';
            this.capacidad = null;
            this.marca = null;
            this.color = null;
    
        }
    }