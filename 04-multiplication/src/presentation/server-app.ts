import { CreateTable } from "../domain/use-cases/create-table.useCase";
import { SaveFile } from '../domain/use-cases/save-file.useCase';

export interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  name?: string;
  destination?: string;
}

export class ServerApp {

  public static run({base, limit, showTable, name, destination}:RunOptions): void {
    console.log('Running server...');
    // creando la tabla
    const tableString : string = new CreateTable().execute({base, limit});
    // imprimir tabla por consola
    if(showTable) console.table(tableString);
    // creando el archivo
    const fileCreated : boolean = new SaveFile().execute({fileName: `${name}-${base}`, fileDestination:destination, fileContent:tableString});
    console.log((fileCreated) ? 'File created' : 'File no created');
  }
}