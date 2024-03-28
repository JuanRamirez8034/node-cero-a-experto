import { describe, test, expect, jest } from '@jest/globals';
import { logger as winstonLogger, buildLogger } from '../../../src/plugins/logger.plugin';


describe('plugins/logger.plugin', () => {
  // se espera que regrese una funcion
  test('buildLogger should return a function', () => {
    const logger = buildLogger('test.logger');
    expect(typeof logger.log).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  // el loger '.log()' debe mostrar un mensaje, se verifica que el metodo log se llame
  test('logger.log() should log message', () => {
    const winstonLoggerMock = jest.spyOn(winstonLogger, 'log');
    const message = 'test message';
    const service = 'test service';

    const logger = buildLogger(service);
    logger.log(message);

    expect(winstonLoggerMock).toHaveBeenCalledWith(
      'info',
      expect.objectContaining({
        level: 'info',
        message,
        service
      })
    );
  });

  // el loger '.error()' debe mostrar un mensaje, se verifica que el metodo log se llame
  test('logger.error() should log message', () => {
    const winstonLoggerMock = jest.spyOn(winstonLogger, 'error');
    const message = 'test message';
    const service = 'test service';

    const logger = buildLogger(service);
    logger.error(message);

    expect(winstonLoggerMock).toHaveBeenCalledWith(
      'error',
      expect.objectContaining({
        message,
        service
      })
    );
  });

});