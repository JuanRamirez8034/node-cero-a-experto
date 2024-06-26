import { CreateTodoDto } from "../../dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

abstract class TodoCreateUseCase {
  abstract excecute(todo: CreateTodoDto): Promise<TodoEntity>;
}

/**
 * Caso de uso para crear un Todo
 */
export class TodoCreate implements TodoCreateUseCase {
  
  /**
   * Inyeccion de dependencias
   * @param repository TodoRepository
   */
  constructor(
    private readonly repository: TodoRepository,
  ){}
  
  /**
   * Ejecutar creacion de un todo
   * @param todo CreateTodoDto
   * @returns Promesa que retorna una entidad de Todo
   */
  public excecute(todo: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(todo);
  }

}