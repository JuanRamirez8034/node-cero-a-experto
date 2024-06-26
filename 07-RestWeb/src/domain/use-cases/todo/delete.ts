import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

abstract class TodoDeleteUseCase {
  abstract excecute(id: number): Promise<TodoEntity | null>;
}

/**
 * Caso de uso para eliminar un Todo
 */
export class TodoDelete implements TodoDeleteUseCase {
  
  /**
   * Inyeccion de dependencias
   * @param repository TodoRepository
   */
  constructor(
    private readonly repository: TodoRepository,
  ){}
  
  /**
   * Ejecutar eliminacion de un todo
   * @param id number
   * @returns Promesa que retorna una entidad de Todo o null
   */
  public excecute(id: number): Promise<TodoEntity | null> {
    return this.repository.deleteById(id);
  }

}