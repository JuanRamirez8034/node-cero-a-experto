import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

abstract class TodoGetByIdUseCase {
  abstract excecute(id: number): Promise<TodoEntity | null>;
}

/**
 * Caso de uso para obtener un Todo
 */
export class TodoGetById implements TodoGetByIdUseCase {
  
  /**
   * Inyeccion de dependencias
   * @param repository TodoRepository
   */
  constructor(
    private readonly repository: TodoRepository,
  ){}
  
  /**
   * Ejecutar la obtenecion de un todo a traves de su id
   * @param id number
   * @returns Promesa que retorna una entidad de Todo o null
   */
  public excecute(id: number): Promise<TodoEntity | null> {
    return this.repository.findById(id);
  }

}