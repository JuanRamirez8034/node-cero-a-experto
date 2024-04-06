export interface CreateTableUseCase {
  execute: (options:CreateTableOptions)=>string;
}

export interface CreateTableOptions {
  base  : number;
  limit?:number;
}

export class CreateTable implements CreateTableUseCase {
  
  constructor(
    /**
     * DI - Dependecy Injection (inyeccion de dependencias)
     */
  ){}

  /**
   * Crear tabla de multiplicar
   * @param tableOptions CreateTableOption
   * @returns Retorna un string que representa una estructura de una tabla de multiplicar
   */
  public execute({base, limit=12}: CreateTableOptions) {
    let tableString: string = this._createHeader(base);
    for(let index = 1; index <= (limit ?? 10); index++){
      const fragment = `${base} X ${index} = ${index * base}\n`;
      tableString += fragment;
    }
    return tableString;
  }

  /**
   * Crear header
   * @param base CreateTableOptions['base']
   * @returns String que representa el hader para la tabla
   */
  private _createHeader(base:CreateTableOptions['base']):string {
    return `============================================\n\tTabla del ${base}\n============================================\n\n`;
  }
}