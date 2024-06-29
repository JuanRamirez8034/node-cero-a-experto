import { prisma } from '../../data/postgres';
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from '../../domain';
import { CustomError } from '../../domain/errors/custom-error';

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
   * @returns Promsea que retorna una entidad de un Todo
   */
  public async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({where: { id }});
    if(todo === null) throw new CustomError(`Todo with id "${id}" not found`, 404);
    return TodoEntity.fromObject(todo);
  }

  /**
   * Actualizar un Todo a traves de su id
   * @param updateTodoDto UpdateTodoDto
   * @returns Promsesa que resuleve una entidad de Todo
   */
  public async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);

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
  public async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const todoDeleted = await prisma.todo.delete({ where: { id: id } });    
    return TodoEntity.fromObject(todoDeleted);
  }


}