
export interface TodoEntityConfig {
  id       : number;
  text     : string;
  createdAt: Date | null;
}

export abstract class TodoEntityModel {
  abstract id       : number;
  abstract text     : string;
  abstract createdAt: Date | null;
}

/**
 * Clase de entidad para representar un Todo
 */
export class TodoEntity implements TodoEntityModel {

  public id: number;
  public text: string;
  public createdAt: Date | null;

  constructor(config: TodoEntityConfig) {
    this.id = config.id;
    this.text = config.text;
    this.createdAt = config.createdAt;
  }

  /**
   * Obtener su fecha de creacion
   * @returns Date | null
   */
  public getDate(): Date | null {
    return this.createdAt;
  }

  /**
   * Obtener una entidad de Todo a partir de un objeto
   * @param object {[key: string]: unknown}
   * @returns TodoEntity instance 
   */
  public static fromObject(object: {[key: string]: unknown}): TodoEntity {
    const { id, text, createdAt, } = object;
    const errorOrigin = '[todoEntity fromObject error]';
    // validaciones
    if(!id || typeof id !== 'number' || isNaN( Number(id) )) throw `${errorOrigin} Id is not a number`;
    if(!text || typeof text !== 'string') throw `${errorOrigin} Text is not a string`;
    if(createdAt === undefined) throw `${errorOrigin} CreatedAt is not a Date or null`;

    const newDate = (createdAt === null) ? null : new Date(createdAt as string | Date);

    return new TodoEntity({id, text, createdAt: newDate});
  }
}