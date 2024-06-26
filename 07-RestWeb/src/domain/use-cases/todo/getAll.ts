import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

abstract class TodoGetAllUseCase {
  abstract excecute(): Promise<Array<TodoEntity>>;
}

/**
 * Caso de uso para obtener todos los Todo
 */
export class TodoGetAll implements TodoGetAllUseCase {
  
  /**
   * Inyeccion de dependencias
   * @param repository TodoRepository
   */
  constructor(
    private readonly repository: TodoRepository,
  ){}
  
  /**
   * Ejecutar la obtencion de todos los todo
   * @returns Promesa que retorna un arreglo de entidad Todo
   */
  public excecute(): Promise<Array<TodoEntity>> {
    return this.repository.getAll();
  }

}