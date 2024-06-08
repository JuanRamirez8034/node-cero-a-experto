import { Router } from "express";
import { TodoController } from "./controller";

/**
 * Clase contenedora de las rutas para Todo
 */
export class TodoRoutes {

  private static _router    : Router = Router();
  private static _controller: TodoController = new TodoController();

  /**
   * Obtener las rutas de la entidad todo
   * @returns Router
   */
  public static get getTodoRoutes(): Router {
   
    this._router.get('/', this._controller.getTodos);         // GET    /
    this._router.get('/:id', this._controller.getTodoById);   // GET    /:id
    this._router.post('/', this._controller.createTodo);      // POST   /
    this._router.put('/:id', this._controller.updateTodo);    // PUT    /:id
    this._router.delete('/:id', this._controller.deleteTodo); // DELETE /:id


    return this._router;
  }
}