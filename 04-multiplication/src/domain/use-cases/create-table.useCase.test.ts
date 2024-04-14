import { describe, test, expect } from '@jest/globals';
import { CreateTable, CreateTableOptions } from './create-table.useCase';


describe('create-table.useCase.ts', () => {
  test('should create table with deafult values', () => {
    const createTable = new CreateTable();
    const tableTextContent = createTable.execute({base:1});
    const lines = tableTextContent.split('\n').length;
    // debe ser una instancia de la clase 
    expect(createTable).toBeInstanceOf(CreateTable);
    // se esperan cierta cantidad de numero de saltos de linea
    expect(lines).toBe(16);
    // se espera que contenga lo siguiente en su cuerpo de respuesta
    expect(tableTextContent).toContain('1 X 1 = 1');
    expect(tableTextContent).toContain('1 X 12 = 12');
  });

  test('should create table with custon values', () => {
    const createTable = new CreateTable();
    const options : CreateTableOptions = {base:2, limit:2};
    const tableTextContent = createTable.execute(options);
    const lines = tableTextContent.split('\n').length;
    // debe ser una instancia de la clase 
    expect(createTable).toBeInstanceOf(CreateTable);
    // se esperan cierta cantidad de numero de saltos de linea
    expect(lines).toBe(4 + options.limit!);
    // se espera que contenga lo siguiente en su cuerpo de respuesta
    expect(tableTextContent).toContain('2 X 1 = 2');
    expect(tableTextContent).toContain('2 X 2 = 4');
  });

});