import { Request, Response} from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dto';
import { TodoEntity, TodoEntityConfig, TodoRepository, TodoUseCase } from '../../domain';

/**
 * Controlador para las peticiones de Todo
 */
export class TodoController {

  /**
   * Dependenci inyection
   */
  constructor( private readonly repository: TodoRepository ){}

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
      .catch( error => res.status(500).json({ error: `Get all Todos internal error` }));
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
      res.status(400).json({error: `ID argument param is not a number`});
      return;
    }

    new TodoUseCase.TodoGetById( this.repository )
      .excecute(id)
      .then( (todo: TodoEntity | null) => {
        if( todo ) return res.status(200).json(todo);          
        return res.status(404).json({error: `Not found a todo with ID ${id}`});
      })
      .catch( error => res.status(500).json({ error: `Get by id todo internal error` }));
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
      .then( (todo: TodoEntity) => res.json(todo) )
      .catch( error => res.status(500).json({ error: `Create new todo internal error` }) );
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
      .then( (todo: TodoEntity | null) => {
        if( !todo ) return res.status(404).json({message: `Todo with id "${id}" not found`});
        return res.json(todo);
      })
      .catch( error => res.status(500).json({ message: `internal error update todo with id "${id} error"`}) );
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
      res.status(400).json({error: `ID argument param is not a number`});
      return;
    } 
    
    new TodoUseCase.TodoDelete( this.repository )
      .excecute( id )
      .then( (todo: TodoEntity | null) => {
        if( !todo ) return res.status(404).json({message: `Todo with id "${id}" not found`});
        res.json({ message: `Todo with id "${id}" deleted`, todo });
      })
      .catch( error => res.status(500).json({message: `Deleted todo with id "${id}" internal error`}));
  }

}