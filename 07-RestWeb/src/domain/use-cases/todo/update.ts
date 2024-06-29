import { UpdateTodoDto } from "../../dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

abstract class TodoUpdateUseCase {
  abstract excecute(todo: UpdateTodoDto): Promise<TodoEntity>;
}

/**
 * Caso de uso para actualizar un Todo
 */
export class TodoUpdate implements TodoUpdateUseCase {
  
  /**
   * Inyeccion de dependencias
   * @param repository TodoRepository
   */
  constructor(
    private readonly repository: TodoRepository,
  ){}
  
  /**
   * Ejecutar actualizacion de un todo
   * @param todo UpdateTodoDto
   * @returns Promesa que retorna una entidad de Todo
   */
  public excecute(todo: UpdateTodoDto): Promise<TodoEntity> {
    return this.repository.updateById(todo);
  }

}