import { describe, test, expect, afterEach, jest } from '@jest/globals';
import fs, { existsSync, readFileSync, rmSync } from "fs";
import { join } from 'path';
import { SaveFile, SaveFileOptions } from './save-file.useCase';



describe('save-file.useCase.ts', () => {
  const defaultOutDir = 'outputs';
  const pathDir = join(__dirname, `../../../${defaultOutDir}`);
  const customOutDir = 'output2';
  const customPathDir = join(pathDir, '../', customOutDir);

  // limpiando acciones realizadas despues de realizar pruebas
  afterEach(() => {
    try {
      const existsDefaultDir = existsSync(pathDir);
      if(existsDefaultDir) rmSync(pathDir, {recursive:true});     
      const existsCustonDir = existsSync(join(customPathDir, '../', customOutDir));
      if(existsCustonDir) rmSync(customPathDir, {recursive:true});     
    } catch (error) {
      console.log(`[Test afterEach Error]${error}`);
    }
  });

  
  // probando los valores por defecto
  test('should save file with default options', () => {    
    const saveFile = new SaveFile();
    const options : SaveFileOptions = {
      fileContent: 'test Hello world',
    };
    const filePath = join(pathDir, 'table.txt');
    const result = saveFile.execute(options);
    const fileExists = existsSync(filePath);
    const fileContent = readFileSync(filePath, {encoding: 'utf-8'});
    
    // validando que se haya creado el archivo
    expect(result).toBeTruthy();
    // validando que el archivo exista
    expect(fileExists).toBeTruthy();
    // validando que el archivo contenga lo que le hemos pasado
    expect(fileContent).toBe(options.fileContent);
    
  });

  // probando con valores personalizados
  test('should save file with custom values options', () => {
    // declaraciones
    const saveFile = new SaveFile();
    const options : SaveFileOptions = {
      fileContent: 'test custom values',
      fileDestination: customOutDir,
      fileName: 'myCustomValue'
    };
    const fileDir = join(customOutDir, `${options.fileName!}.txt`);

    // acciones
    const result = saveFile.execute(options);
    const fileExists = existsSync(fileDir);
    const fileContent = readFileSync(fileDir, { encoding: 'utf-8' });

    // validando que se haya creado el archivo
    expect(result).toBeTruthy();
    // validando que el archivo exista
    expect(fileExists).toBeTruthy();
    // validando que el archivo contenga lo que le hemos pasado
    expect(fileContent).toBe(options.fileContent);
    
  });

  // probando que se lanze un error al momento de crear el directorio y retorne falso
  test('should return false if directory could not be created', () => {
    // modificando el comportamiento de la funcionalidad de fs -> mkDirSync
    const mkDirSyncSpy = jest.spyOn(fs, 'mkdirSync')
     .mockImplementation(() => { throw new Error('[Test custom mok error] This is a custom error in mkdirSync from testong') });
    
    const saveFile = new SaveFile();
    const result = saveFile.execute({fileContent: 'Test error'});
    
    // comprobando el resultado
    expect(result).toBeFalsy();

    // restaurando la funcionalidad original de la funcion
    mkDirSyncSpy.mockRestore();
  });

  // probando que se lanze un error al momento de crear el archivo y retorne falso
  test('should return false if file could not be created', () => {
    // modificando el comportamiento de la funcionalidad de fs -> writeFileSync
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync')
     .mockImplementation(() => { throw new Error('[Test custom mok error] This is a custom error in writeFileSync from testong') });
    // modificando el comportamiento de la funcionalidad de fs -> mkDirSync
    const mkDirSyncSpy = jest.spyOn(fs, 'mkdirSync')
     .mockImplementation(() => undefined);
    
    const saveFile = new SaveFile();
    const result = saveFile.execute({fileContent: 'Test error'});
    
    // comprobando el resultado
    expect(result).toBeFalsy();

    // restaurando la funcionalidad original de la funcion
    writeFileSyncSpy.mockRestore();
    mkDirSyncSpy.mockRestore();
  });
});
