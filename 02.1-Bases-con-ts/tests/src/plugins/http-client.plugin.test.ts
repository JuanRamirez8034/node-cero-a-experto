import { describe, test, expect } from '@jest/globals';
import { httpAxiosClientPlugin } from './../../../src/plugins/http-client.plugin';

interface Response {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

describe('plugins/http-client.plugin', () => {
  // se espera que la respuesta del metodo get sea un Response en formato json
  test('httpAxiosClientPlugin should return a response json from api', async () => {
    const resp = await httpAxiosClientPlugin.get<Response>('https://jsonplaceholder.typicode.com/todos/1');
    expect(resp).toEqual({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: expect.any(Boolean) // especifica que el valor debe ser ver booleano
    });
  });
});