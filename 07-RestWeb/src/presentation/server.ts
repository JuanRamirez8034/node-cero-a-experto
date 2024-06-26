import express, {Express, NextFunction, Request, Router} from 'express';
import { join } from 'path';

export interface ServerConfig {
  port:number;
  publicDirFiles?: string;
  routes: Router;
}

/**
 * Clase del servidor implementado con express
 */
export class Server {

  private readonly _serverApp : Express = express();
  private readonly _port : number;
  private readonly _publicDir : string;
  private readonly _routes: Router;

  constructor(config:ServerConfig){
    this._port = config.port;
    this._publicDir = config.publicDirFiles ?? 'public';
    this._routes = config.routes;
  }

  /**
   * Levantar el servidor
   */
  public async start(): Promise<void>{
    console.log(`Server running on`);

    // middleware
    this._serverApp.use(this._logRequestPathMiddleWare);
    this._serverApp.use(express.json());
    this._serverApp.use(express.urlencoded({extended:true}));

    // rutas del servidor
    this._serverApp.use(this._routes);
    
    // sirviendo archivos estaticos de la apicacion
    this._serverApp.use(express.static(this._publicDir));

    // resolviendo conflicto al cargar la aplicacion desde cualquier ruta de la misma
    this._serverApp.get('*', (req, res) => {
      const indexPath = join(__dirname, '../../', this._publicDir, 'index.html');
      res.statusCode = 200;
      res.sendFile(indexPath);     
    });

    // activando la escucha del servidor
    this._serverApp.listen(this._port, () => {
      console.log(`> http://localhost:${this._port}`);      
    });
  }

  private _logRequestPathMiddleWare(req:Request, _:unknown, next:NextFunction){
    console.log(`${req.method.toUpperCase()} ${req.url}`);
    next();
  }

}