import { envVars } from '../src/plugins/env.plugin';
import { Server } from '../src/presentation/server';

jest.mock('../src/presentation/server');

describe('app.ts', () => {

  test('should start server with config', async () => {
    
    await import('../src/app');
    
    expect( Server ).toHaveBeenCalledTimes(1);
    expect( Server ).toHaveBeenCalledWith({
      port: envVars.PORT,
      publicDirFiles: envVars.PULBIC_DIRECTORY,
      routes: expect.any(Function),
    });
    expect( Server.prototype.start ).toHaveBeenCalledTimes(1);
  });
  
});