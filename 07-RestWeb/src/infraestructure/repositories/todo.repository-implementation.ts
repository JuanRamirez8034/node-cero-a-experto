import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

/**
 * Implementacion de un repositorio para el manejo de los procesos para los Todo
 */
export class TodoRepositoryImplementation implements TodoRepository {

  /**
   * Inyeccion de dependencias para la clase del repositorio
   * @param dataSource TodoDataSource
   */
  constructor(private readonly dataSource: TodoDataSource){ }


  /**
   * Crear un nuevo Todo
   * @param createTodoDto CreateTodoDto
   * @returns Promesa que resuelve una entidad de Todo
   */
  public async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.dataSource.create(createTodoDto);
  }
  
  /**
   * Obtener todos los Todo
   * @returns Promesa que resuelve un arreglo de entidades de Todo
   */
  public async getAll(): Promise<TodoEntity[]> {
    return this.dataSource.getAll();
  }
  
  /**
   * Encontrar un Todo a traves de su id
   * @param id number
   * @returns Promesa que resuelve una entidad de Todo
   */
  public async findById(id: number): Promise<TodoEntity> {
    return this.dataSource.findById(id);
  }
  
  /**
   * Actualizar un todo a partir de su id
   * @param updateTodoDto UpdateTodoDto
   * @returns Promesa que resuelve una entidad de Todo
   */
  public async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.dataSource.updateById(updateTodoDto);
  }
  
  /**
   * Eliminar un Todo a partir de una id
   * @param id number
   * @returns Promesa que resuelve una entidad de Todo
   */
  public async deleteById(id: number): Promise<TodoEntity> {
    return this.dataSource.deleteById(id);
  }
  
}