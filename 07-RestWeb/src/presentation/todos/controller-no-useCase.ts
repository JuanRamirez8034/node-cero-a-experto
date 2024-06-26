import { Request, Response} from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dto';
import { TodoEntity, TodoEntityConfig, TodoRepository } from '../../domain';

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
   * @returns Promise<void>
   */
  public async getTodos(req: Request, res: Response): Promise<void> {
    try {      
      const todoEntities = await this.repository.getAll();
      res.json(todoEntities);
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ error: `Get all Todos internal error` });
    }
  }

  /**
   * Obtener una tarea a traves de su id
   * @param req Request
   * @param res Response
   * @returns Promise<void>
   */
  public async getTodoById(req: Request, res: Response): Promise<void> {
    const id : number = parseInt(req.params.id);

    if( isNaN(id) ){
      res.status(400).json({error: `ID argument param is not a number`});
      return;
    }
    
    try {
      const oneTodo: TodoEntity | null = await this.repository.findById(id);
  
      if( oneTodo ){
        res.status(200).json(oneTodo);
        return;
      }
        
      res.status(404).json({error: `Not found a todo with ID ${id}`});
      return;  
    } catch (error) {
      res.status(500).json({ error: `Get by id todo internal error` });
    }
  }

  /**
   * Registrar nueva tarea
   * @param req Request
   * @param res Response
   * @returns Promise<void>
   */
  public async createTodo(req: Request, res: Response): Promise<void> {
    const [error, todoDto] = CreateTodoDto.create(req.body);
    
    if( error || todoDto === null){
      res.status(400).json({message: error ?? 'Body properties invaild'});
      return;
    }

    try {
      const newTodo : TodoEntity = await this.repository.create(todoDto);
  
      res.json(newTodo);
      return;
    } catch (error) {
      res.status(500).json({ error: `Create new todo internal error` });
    }
  }

  /**
   * Actualizar una tarea
   * @param req Request
   * @param res Response
   * @returns Promise<void>
   */
  public async updateTodo(req: Request, res: Response): Promise<void> {
    const id: TodoEntityConfig['id'] = parseInt(req.params.id);
    try {
      const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

      if( error || updateTodoDto === null ){
        res.status(400).json({ message: error ?? 'Update body properties error' });
        return;
      }
      
      const todo: TodoEntity | null = await this.repository.updateById(updateTodoDto);

      if( !todo ){
        res.status(404).json({message: `Todo with id "${id}" not found`});
        return;
      }

      res.json(todo);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `internal error update todo with id "${id} error"`});
    }

  }

  /**
   * Eliminar una tarea
   * @param req Request
   * @param res Response
   * @returns Promise<void>
   */
  public async deleteTodo(req: Request, res: Response): Promise<void> {
    const id: TodoEntityConfig['id'] = parseInt(req.params.id);
    
    try {
      if( isNaN(id) ){
        res.status(400).json({error: `ID argument param is not a number`});
        return;
      }    
      
      const todo: TodoEntity | null = await this.repository.deleteById(id)    ;
      
      if( !todo ){
        res.status(404).json({message: `Todo with id "${id}" not found`});
        return;
      }  

      res.json({ message: `Todo with id "${id}" deleted`, todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({message: `Deleted todo with id "${id}" internal error`});
    }
  }

}