import { Request, Response} from "express";

interface Todo {
  id:        number;
  text:      string;
  createdAt: Date | string | null;
}

const data: Todo[] = [
  { id: 1, text: 'todo 1', createdAt: new Date() },
  { id: 2, text: 'todo 2', createdAt: new Date() },
  { id: 3, text: 'todo 3', createdAt: new Date() },
];

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
    res.json(data);
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
    
    const oneTodo = data.find( e => e.id === id);

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
    const { text } : Todo = req.body ?? {};
    
    if( !text ){
      res.status(400).json({message: 'body request invaild'});
      return;
    }

    const newTodo : Todo = {
      id: data.length + 1,
      text, 
      createdAt: new Date(),
    };

    data.push(newTodo);
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
    const { text, createdAt } : Todo = req.body;

    if( isNaN(id) ){
      res.status(400).json({error: `ID argument param is not a number`});
      return;
    }

    if( text && typeof text !== 'string'){
      res.status(400).json({message: 'body request invaild'});
      return;
    }

    const todo = data.find(t => t.id === id);

    if( !todo ){
      res.status(404).json({message: `Todo with id "${id}" not found`});
      return;
    }

    // si existe el texto se actualiza
    todo.text = (text) ? text : todo.text;
    // si existe la fecha se actualiza
    todo.createdAt = (createdAt && typeof createdAt !== 'boolean')
    ? new Date(createdAt) 
    : (createdAt === null)
      ? null
      : todo.createdAt ;

    res.status(200).json(todo);

  }

  /**
   * Eliminar una tarea
   * @param req Request
   * @param res Response
   * @returns Promise<void>
   */
  public async deleteTodo(req: Request, res: Response): Promise<void> {
    const id: Todo['id'] = parseInt(req.params.id);

    if( isNaN(id) ){
      res.status(400).json({error: `ID argument param is not a number`});
      return;
    }
    
    const todoIndexNumber = data.findIndex(t => t.id === id);
    
    if( todoIndexNumber === -1 ){
      res.status(404).json({message: `Todo with id "${id}" not found`});
      return;
    }
    // eliminando el elemento
    data.splice(todoIndexNumber, 1)

    res.status(200).json({ message: `Todo with id "${id}" deleted` });
  }

}