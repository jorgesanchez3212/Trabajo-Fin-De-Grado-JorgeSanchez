export class Login {
    public username: string;
    public password: string;
  
    constructor(username:string,password:string){
      this.username = username;
      this.password = password;
    }
    public getUsername():string{
      return this.username;
  }

  public setUsername(username:string):void{
      this.username = username;
  }

  public getPassword():string{
      return this.password;
  }

  public setPassword(password : string):void{
      this.password = password;
  }
  }