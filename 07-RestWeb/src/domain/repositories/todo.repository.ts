import { CreateTodoDto, UpdateTodoDto } from "../dto";
import { TodoEntity } from "../entities/todo.entity";

/**
 * Modelo abstracto de la estructura de un repositorio para el manejo de los Todo
 */
export abstract class TodoRepository {
  
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
  
  // todo: agregar paginacion
  abstract getAll(): Promise<Array<TodoEntity>>;
  
  abstract findById(id: number): Promise<TodoEntity>;

  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

  abstract deleteById(id: number): Promise<TodoEntity>;
  
}