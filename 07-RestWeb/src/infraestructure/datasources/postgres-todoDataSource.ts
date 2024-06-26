import { prisma } from '../../data/postgres';
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from '../../domain';

export class PostgresTodoDataSource implements TodoDataSource {
  
  /**
   * Crear un nuevo Todo
   * @param createTodoDto CreateTodoDto
   * @returns Promesa que resuleve una entidad de Todo
   */
  public async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto
    });
    return TodoEntity.fromObject(todo);
  }

  /**
   * Obtener todos los Todo
   * @returns Promsesa que retorna un arreglo de entidades de Todo
   */
  public async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map( TodoEntity.fromObject );
  }

  /**
   * Obtener un Todo a partir de una id
   * @param id number
   * @returns Promsea que retorna una entidad de un Todo o null
   */
  public async findById(id: number): Promise<TodoEntity | null> {
    const todo = await prisma.todo.findFirst({where: { id }});
    return (todo === null) ? null : TodoEntity.fromObject(todo);
  }

  /**
   * Actualizar un Todo a traves de su id
   * @param updateTodoDto UpdateTodoDto
   * @returns Promsesa que resuleve un null o una entidad de Todo
   */
  public async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null> {
    const todoEntity = await this.findById(updateTodoDto.id);
    if(todoEntity === null) return null;

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data : updateTodoDto.asValues,
    });
    return TodoEntity.fromObject(updatedTodo);
  }

  /**
   * Eliminar un Todo a traves de su id
   * @param id number
   * @returns Promsea que resuelte una entidad de Todo
   */
  public async deleteById(id: number): Promise<TodoEntity | null> {
    const todoEntity = await this.findById(id);
    if(todoEntity === null) return null;

    const todoDeleted = await prisma.todo.delete({ where: { id: id } });    
    return TodoEntity.fromObject(todoDeleted);
  }


}