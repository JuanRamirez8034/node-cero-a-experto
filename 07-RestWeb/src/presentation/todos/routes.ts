import { Router } from "express";
import { TodoController } from "./controller";
import { TodoDataSource, TodoRepository } from "../../domain";
import { PostgresTodoDataSource } from "../../infraestructure/datasources/postgres-todoDataSource";
import { TodoRepositoryImplementation } from "../../infraestructure/repositories/todo.repository-implementation";

/**
 * Clase contenedora de las rutas para Todo
 */
export class TodoRoutes {

  private static readonly _router         : Router = Router();
  private static readonly _todoDataSource : TodoDataSource = new PostgresTodoDataSource();
  private static readonly _todoRepository : TodoRepository = new TodoRepositoryImplementation(this._todoDataSource);
  private static readonly _controller     : TodoController = new TodoController(this._todoRepository);

  /**
   * Obtener las rutas de la entidad todo
   * @returns Router
   */
  public static get getTodoRoutes(): Router {
   
    this._router.get('/', (req, res) => this._controller.getTodos(req, res));         // GET    /
    this._router.get('/:id', (req, res) => this._controller.getTodoById(req, res));   // GET    /:id
    this._router.post('/', (req, res) => this._controller.createTodo(req, res));      // POST   /
    this._router.put('/:id', (req, res) => this._controller.updateTodo(req, res));    // PUT    /:id
    this._router.delete('/:id', (req, res) => this._controller.deleteTodo(req, res)); // DELETE /:id


    return this._router;
  }
}