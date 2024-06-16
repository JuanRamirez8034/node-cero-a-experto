

export abstract class CreateTodoDtoModel {
  abstract readonly text: string;
  abstract readonly createdAt: Date | null;
}

/**
 * Clase representadora de la data del objeto de tranferencia de TODO para crear
 */
export class CreateTodoDto implements CreateTodoDtoModel {
  
  public readonly text: string;
  public readonly createdAt: Date | null;

  constructor(text: string, createdAt: Date | null){
    this.text      = text;
    this.createdAt = createdAt;
  }

  /**
   * Crear nueva instancia de un dto a guardar
   * @param props {[key:string]: any}
   * @returns Tupla que representa el error o la instancia del dto de todo
   */
  public static create(props: {[key:string]: any}): [string|null, CreateTodoDto | null] {
    const { text, createdAt } = props;
    // validaciones
    if(text === undefined || text === null) return ['The text property is undefined', null];
    if(typeof text !== 'string') return ['The text property is not a string', null];
    if(text.trim().length === 0) return ['The text property is not a empty string', null];
    if(createdAt === undefined) return ['The createdAt property is undefined', null];
    if(typeof createdAt !== 'string' && createdAt !== null) return ['The createdAt property is not a date or null', null];
    if(typeof createdAt === 'string' && createdAt.trim().length === 0) return ['The createdAt property is not a date, empty string is invaild', null];
    const _createdAt = (createdAt === null) ? null : new Date(createdAt);
    if(`${_createdAt}`.toLowerCase() === 'Invalid Date'.toLowerCase()) return ['The createdAt property is not a date format valid', null];
    
    return [null, new CreateTodoDto(text, _createdAt)];
  }

}