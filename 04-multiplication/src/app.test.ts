import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { ServerApp } from './presentation/server-app';


describe('app.ts', () => {
  const orgArgv = [...process.argv];

  beforeEach(() => {
    process.argv = orgArgv;
    jest.resetAllMocks();
  });

  // la funcion de ServerApp debe haber sido llamada con los valores especificados
  test('should call Server.run with values', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = ['-b', '1', '-l', '5', '-s', '-n', 'test-file-app', '-d', 'appOutput'];

    await import('./app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 1,
      limit: 5,
      showTable: true, 
      name: 'test-file-app', 
      destination: 'appOutput'
    });
  });
});