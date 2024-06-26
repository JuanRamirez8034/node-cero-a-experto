import { CreateTodoDto, UpdateTodoDto } from "../dto";
import { TodoEntity } from "../entities/todo.entity";

/**
 * Modelo abstracto de la estructura de un data source para el manejo de los Todo
 */
export abstract class TodoDataSource {

  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  // todo: agregar paginacion
  abstract getAll(): Promise<Array<TodoEntity>>;

  abstract findById(id: number): Promise<TodoEntity | null>;

  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null>;

  abstract deleteById(id: number): Promise<TodoEntity | null>;
  
}