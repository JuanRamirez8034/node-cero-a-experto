

export abstract class UpdateTodoDtoModel {
  abstract readonly text?: string;
  abstract readonly createdAt?: Date | null;
  abstract readonly id: number;
}

export interface PatrialUpdateDtoModel extends Omit<UpdateTodoDtoModel, 'id'> {}

/**
 * Clase representadora de la data del objeto de tranferencia de TODO para actualizar
 */
export class UpdateTodoDto implements UpdateTodoDtoModel {
  
  public readonly id: number;
  public readonly text?: string;
  public readonly createdAt?: Date | null;

  constructor(id: number, text?: string, createdAt?: Date | null){
    this.text      = text;
    this.createdAt = createdAt;
    this.id        = id;
  }

  public get asValues(): PatrialUpdateDtoModel {
    return {
      text: this.text,
      createdAt: this.createdAt,
    };
  }

  /**
   * Crear nueva instancia de un dto a actualizar
   * @param props {[key:string]: any}
   * @returns Tupla que representa el error o la instancia del dto de todo
   */
  public static create(props: {[key:string]: string | number | null | Date | undefined}): [string|null, UpdateTodoDto | null] {
    const { text, createdAt, id } = props;
    let _createdAt : Date | null | undefined = undefined;

    // validaciones
    if(!id) return ['The id property is undefined', null];
    if(isNaN( parseInt(`${id}`) )) return ['The id property is not a number', null];
    if(createdAt === undefined && text === undefined) return ['The properties to updated invaild or undefined', null];
    if(text === null || (text !== undefined && typeof text !== 'string')) return ['The text property is not a string', null];
    if(text !== undefined && `${text}`.trim().length === 0) return ['The text property is an empty string', null];
    
    if(createdAt !== undefined){
      if(createdAt !== null && typeof createdAt === 'string' && createdAt.trim().length === 0) return ['The createdAt property is not a date, empty string is invaild', null];
      if(createdAt !== null && typeof createdAt === 'boolean') return ['The createdAt property is not a date, boolean is invaild', null];
      _createdAt = (createdAt === null) ? null : new Date(createdAt);
      if(`${_createdAt}`.toLowerCase() === 'Invalid Date'.toLowerCase()) return ['The createdAt property is not a date format valid', null];
    }

    
    return [null, new UpdateTodoDto(parseInt(`${id}`), ((text) ? `${text}` : undefined), _createdAt)];
  }

}