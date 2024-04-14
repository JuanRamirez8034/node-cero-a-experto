import { /**createWriteStream,*/ existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

export interface SaveFileUsecase {
  execute: (options:SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUsecase {
  
  constructor(
    /**
     * repository: StorageRepository
     */
  ){}
  
  /**
   * Crear un archivo a partir de una cadena de texto
   * @param options SaveFileOptions 
   * @returns Retorna un boolean que representa si se creo o no el archivo
   */
  public execute({fileDestination, fileName, fileContent}: SaveFileOptions){
    try {
      // estableciendo las rutas de directorios
      let _dirPatch : string = path.join(__dirname, `../../../${fileDestination ?? 'outputs'}`);
      // verificando que exista la carpeta, si no existe se crea
      if(!existsSync(_dirPatch)) mkdirSync(_dirPatch, {recursive:true});
      // añadiendo el nombre del archivo a la ruta del directorio
      _dirPatch = path.join(_dirPatch, (fileName ?? 'table') + '.txt');
      // creando el archivo
      writeFileSync(`${_dirPatch}`, fileContent, {encoding: 'utf-8'});
      // const writer = createWriteStream(`${_dirPatch}`, {encoding:'utf-8'});
      // writer.write(fileContent);
      // writer.close();
      // retornando respuesta
      return true;
    } catch (error) {
      // console.error(error); // colocar con un logger
      return false;
    }
  }

}