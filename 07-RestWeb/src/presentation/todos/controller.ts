import { Request, Response} from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dto';

interface Todo {
  id:        number;
  text:      string;
  createdAt: Date | string | null;
}

/**
 * Controlador para las peticiones de Todo
 */
export class TodoController {

  constructor(
    /**
     * Dependenci inyection
     */
  ){}

  /**
   * Obtener todas las tareas
   * @param req Request
   * @param res Response
   * @returns Promise<void>
   */
  public async getTodos(req: Request, res: Response): Promise<void> {
    const todos: Todo[] = await prisma.todo.findMany();
    res.json(todos);
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
    
    const oneTodo: Todo | null = await prisma.todo.findFirst({where: { id }});

    if( oneTodo ){
      res.status(200).json(oneTodo);
      return;
    }
      
    res.status(404).json({error: `Not found a todo with ID ${id}`});
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

    const newTodo : Todo = await prisma.todo.create({
      data: todoDto
    });

    res.json(newTodo);
  }

  /**
   * Actualizar una tarea
   * @param req Request
   * @param res Response
   * @returns Promise<void>
   */
  public async updateTodo(req: Request, res: Response): Promise<void> {
    const id: Todo['id'] = parseInt(req.params.id);
    try {
      const [error, updateTodoDto] = UpdateTodoDto.create({id, ...req.body});

      if( error || updateTodoDto === null ){
        res.status(400).json({ message: error ?? 'Update body properties error' });
        return;
      }

      const todo: Todo | null = await prisma.todo.findFirst({where: { id }});
      

      if( !todo ){
        res.status(404).json({message: `Todo with id "${id}" not found`});
        return;
      }

      const updatedTodo = await prisma.todo.update({
        where: { id },
        data : updateTodoDto.asValues,
      });

      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `update todo with id "${id} error"`});
    }

  }

  /**
   * Eliminar una tarea
   * @param req Request
   * @param res Response
   * @returns Promise<void>
   */
  public async deleteTodo(req: Request, res: Response): Promise<void> {
    const id: Todo['id'] = parseInt(req.params.id);
    
    try {
      if( isNaN(id) ){
        res.status(400).json({error: `ID argument param is not a number`});
        return;
      }    
      
      // const todoIndexNumber = data.findIndex(t => t.id === id);
      const todo: Todo | null = await prisma.todo.findFirst({ where: { id: id } });    
      
      if( !todo ){
        res.status(404).json({message: `Todo with id "${id}" not found`});
        return;
      }
      // eliminando el elemento
      // data.splice(todoIndexNumber, 1)
      const todoDeleted: Todo = await prisma.todo.delete({ where: { id: id } });    

      res.status(200).json({ message: `Todo with id "${id}" deleted`, todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({message: `Deleted todo with id "${id}" error`});
    }
  }

}