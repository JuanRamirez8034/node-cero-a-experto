import { Request, Response} from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dto';
import { TodoEntity, TodoEntityConfig, TodoRepository, TodoUseCase } from '../../domain';
import { CustomError } from '../../domain/errors/custom-error';

/**
 * Controlador para las peticiones de Todo
 */
export class TodoController {

  /**
   * Dependenci inyection
   */
  constructor( private readonly repository: TodoRepository ){}

  /**
   * Resolver la respuesta de errores manejando la informacion de los mismos (este codigo se podria reutilizar, se puede crear aparte en un archivo)
   * @param res Response
   * @param error unknown
   * @returns void
   */
  private _handleErrorResponse(res: Response, error: unknown): void {
    // si es una instancia de un error personalizado regresamos informacion con este
    if(error instanceof CustomError){
      res.status(error.statusCode).json({ message: error.message });
      return;
    }
    // si es otro tipo de erro regresamos un error interno
    res.status(500).json({ message: 'Internal error - check server' });
  }

  /**
   * Obtener todas las tareas
   * @param req Request
   * @param res Response
   * @returns void
   */
  public getTodos(req: Request, res: Response): void {
    new TodoUseCase.TodoGetAll(this.repository)
      .excecute()
      .then( (todos: Array<TodoEntity>) => res.json(todos) )
      .catch( error => res.status(500).json({ message: `Get all Todos internal error` }));
  }

  /**
   * Obtener una tarea a traves de su id
   * @param req Request
   * @param res Response
   * @returns void
   */
  public getTodoById(req: Request, res: Response): void {
    const id : number = parseInt(req.params.id);

    if( isNaN(id) ){
      res.status(400).json({message: `ID argument param is not a number`});
      return;
    }

    new TodoUseCase.TodoGetById( this.repository )
      .excecute(id)
      .then( (todo: TodoEntity) => res.status(200).json(todo))
      .catch( error => this._handleErrorResponse(res, error));
  }

  /**
   * Registrar nueva tarea
   * @param req Request
   * @param res Response
   * @returns void
   */
  public createTodo(req: Request, res: Response): void {
    const [error, todoDto] = CreateTodoDto.create(req.body);
    
    if( error || todoDto === null){
      res.status(400).json({message: error ?? 'Body properties invaild'});
      return;
    }

    new TodoUseCase.TodoCreate( this.repository )
      .excecute( todoDto )
      .then( (todo: TodoEntity) => res.status(201).json(todo) )
      .catch( error => res.status(500).json({ message: `Create new todo internal error` }) );
  }

  /**
   * Actualizar una tarea
   * @param req Request
   * @param res Response
   * @returns void
   */
  public updateTodo(req: Request, res: Response): void {
    const id: TodoEntityConfig['id'] = parseInt(req.params.id);
    
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
    
    if( error || updateTodoDto === null ){
      res.status(400).json({ message: error ?? 'Update body properties error' });
      return;
    }

    new TodoUseCase.TodoUpdate( this.repository )
      .excecute( updateTodoDto )
      .then( (todo: TodoEntity) => res.json(todo) )
      .catch( error => this._handleErrorResponse(res, error) );
  }

  /**
   * Eliminar una tarea
   * @param req Request
   * @param res Response
   * @returns void
   */
  public deleteTodo(req: Request, res: Response): void {
    const id: TodoEntityConfig['id'] = parseInt(req.params.id);
    
    if( isNaN(id) ){
      res.status(400).json({message: `ID argument param is not a number`});
      return;
    } 
    
    new TodoUseCase.TodoDelete( this.repository )
      .excecute( id )
      .then( (todo: TodoEntity) => res.json({ message: `Todo with id "${id}" deleted`, todo }) )
      .catch( error => this._handleErrorResponse(res, error) );
  }

}