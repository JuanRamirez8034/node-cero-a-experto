import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

/**
 * Clase contenedora de las rutas para todas las entidades manejadas
 */
export class MainRoutes {

  private static _router: Router = Router();

  /**
   * Obtener todas las rutas de todas las entidades
   * @returns Router
   */
  public static get(): Router {
    
   
    this._router.use('/api/v1/todo', TodoRoutes.getTodoRoutes);

    return this._router;
  }
}