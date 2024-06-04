import express, {Express} from 'express';
import { join } from 'path';

export interface ServerConfig {
  port:number;
  publicDirFiles?: string;
}

export class Server {

  private readonly _serverApp : Express = express();
  private readonly _port : number;
  private readonly _publicDir : string;

  constructor(config:ServerConfig){
    this._port = config.port;
    this._publicDir = config.publicDirFiles ?? 'public';
  }

  public async start(): Promise<void>{
    console.log(`Server running on`);
    
    this._serverApp.use(express.static(this._publicDir));

    this._serverApp.get('*', (req, res) => {
      const indexPath = join(__dirname, '../../', this._publicDir, 'index.html');
      res.statusCode = 200;
      res.sendFile(indexPath);     
    });

    this._serverApp.listen(this._port, () => {
      console.log(`> http://localhost:${this._port}`);      
    });
  }

}