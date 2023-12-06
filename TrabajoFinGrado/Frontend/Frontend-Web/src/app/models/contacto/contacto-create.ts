export class ContactoCreateDto {
    public descripcion : string;
    public idCliente : string;
    
        constructor(){
            this.descripcion = '';
            this.idCliente = '';
        
        }
    }