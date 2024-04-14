import { describe, test, expect, beforeEach, jest } from '@jest/globals';
// import { yargsArgv } from './argv.plugin.test';


describe('argv.plugin.test', () => {
  // almacenando el estado original del argument value
  const originalArgv = process.argv;
  // restableciendo los modulos al terminar
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  // probando valores por defecto
  test('should return default values', async () => {
    const base = 1
    const _argv = await runCommand('-b', `${base}`);

    // comprobando valores por defecto
    expect(_argv).toEqual(expect.objectContaining({
      b: base,
      l: 10,
      s: false,
      n: 'multiplication-table',
      d: 'outputs',
    }));
  });

  // probando los valores personalizados
  test('should return configuration custom values', async () => {
    const b = 1;
    const l = 10;
    const s = true;
    const n = 'multiplication-custon-name';
    const d = 'custom-out-dir';
    const _argv = await runCommand('-b', `${b}`, '-l', `${l}`, '-s', `${s}`, '-n', n, '-d', d);
    
    // comprobando valores personalizados
    expect(_argv).toEqual(expect.objectContaining({ b, l, s, n, d}));
  });
});

/**
 * Simular correr valores en la consola
 * * Pasar valores al process.argv
 * @returns PromiseRunCommand
 */
const runCommand = async (...args:Array<string>) : PromiseRunCommand => {
  // modificacion de los valores por defecto de los argv
  process.argv = [...process.argv, ...args];
  // importacion dinamica de la adaptacion de yarg
  const { yargsArgv } = await import('./argv.plugin');

  return yargsArgv;
}

type PromiseRunCommand = Promise<{
  [x: string]: unknown;
  b: number;
  l: number;
  s: boolean;
  n: string;
  d: string;
  _: (string | number)[];
  $0: string;
}>;