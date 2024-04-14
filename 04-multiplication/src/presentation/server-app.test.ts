import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { RunOptions, ServerApp } from "./server-app";
import { CreateTable, CreateTableOptions } from '../domain/use-cases/create-table.useCase';
import { SaveFile } from '../domain/use-cases/save-file.useCase';

describe('server-app.ts', () => {
  // opciones para llamar el servidor
  const options : RunOptions = {
    base: 1,
    limit: 10,
    showTable: true,
    destination: 'ouputServer',
    name: 'server-test'
  };

  // limpiando los mocks
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // deber ser una instancia de la clase
  test('should create a ServerApp instancve', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof(ServerApp.run)).toBe('function');
  });

  // se debe llamar el console.log en dos casos, llamar la creacion de tabla, llamar guardar archivo
  test('should call log, created table and save file', () => {
    // // espiando los console.log
    // const consoleSpy = jest.spyOn(console, 'log');
    // // modificando la funcionalidad del console.log
    // const consoleSpyMock = consoleSpy.mockImplementation(() => undefined);
    // // espiando la creacion de tabla
    // const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    // // modificando la funcionalidad de crear tabla
    // const createTableSpuMock = createTableSpy.mockImplementation(() => 'tableContent');
    // // espiando el guardado de archivos
    // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
    // // modificando la funcionalidad de crear archivo
    // const saveFileSpyMock = saveFileSpy.mockImplementation(() => true);

    // // llamando la funcionalidad
    // ServerApp.run(options);


    // // se debe llamar dos veces el log
    // expect(consoleSpy).toHaveBeenCalledTimes(3);
    // // se debe ejecutar log -> Running server...
    // expect(consoleSpy).toHaveBeenCalledWith('Running server...');
    // // se debe ejecutar log -> File created
    // expect(consoleSpy).toHaveBeenCalledWith('File created');
    // // se debe ejecutar log -> tableContent
    // expect(consoleSpy).toHaveBeenCalledWith('tableContent');

    // // crear tabla debe haber sido llamada
    // expect(createTableSpy).toHaveBeenCalledTimes(1);
    // // crear tabla se debe llamar con la configuracion asignada
    // expect(createTableSpy).toHaveBeenCalledWith({base: options.base, limit: options.limit});

    // // crear el archivo se debe haber sido llamada
    // expect(saveFileSpy).toHaveBeenCalledTimes(1);
    // // crear archivo debe haber sido llamada con lo especificado
    // expect(saveFileSpy).toHaveBeenCalledWith({
    //   fileName: `${options.name}-${options.base}`, 
    //   fileDestination:options.destination, 
    //   fileContent:expect.any(String)
    // });

    // // lipiando modificaciones
    // saveFileSpyMock.mockRestore();
    // createTableSpuMock.mockRestore();
    // consoleSpyMock.mockRestore();  
  });

  // test mas molecular, llamadas console log, createTable, saveFile
  test('should called functions molecular mode', () => {
    const logMock = jest.fn();
    const createTableMock = jest.fn(()=>'custonValue');
    const saveFileMock = jest.fn(()=>true);

    console.log = logMock;
    CreateTable.prototype.execute = createTableMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Running server...');
    expect(logMock).toHaveBeenCalledWith('File created');
    expect(createTableMock).toHaveBeenCalledWith({base:options.base, limit:options.limit});
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: 'custonValue',
      fileDestination: options.destination,
      fileName: `${options.name}-${options.base}`
    });
    expect(logMock).not.toBeCalledWith('File no created')

  })
});