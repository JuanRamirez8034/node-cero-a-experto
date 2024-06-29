import request from 'supertest';
import ServerTest from '../../server-test';
import { CreateTodoDto } from '../../../src/domain';
import { prisma } from '../../../src/data/postgres';

describe('todos/routes.test.ts', () => {

  const todo1 = new CreateTodoDto('Todo test 1', null);
  const todo2 = new CreateTodoDto('Todo test 2', new Date('04/04/2024'));

  beforeEach(async () => {
    // eliminacion de registros antiguos de la bdd
    await prisma.todo.deleteMany();
  });

  beforeAll(async () => {
    await ServerTest.start();
  });

  afterAll(async () => {
    await ServerTest.closeServer();
  });

  /**
   * prueba al endpoint de obtener todos los Todos
   */
  test('should return Todos /api/v1/todo', async () => {

    // agregacion de los unicos dos todos a evaluar
    await prisma.todo.createMany({ data: [todo1, todo2] });
    
    const resp = await request( ServerTest.getServerApp )
      .get('/api/v1/todo')
      .expect(200);

    // evaluaciones
    expect( resp.body ).toBeInstanceOf( Array );
    expect( (resp.body as []).length ).toBe(2);
    expect( resp.body[0].text ).toBe( todo1.text );
    expect( resp.body[1].text ).toBe( todo2.text );
    expect( resp.body[0].createdAt ).toBe( todo1.createdAt );
    
  });


  /**
   * prueba al endpoint de obtener un todo a partir de un id
   */
  test('should return a Todo by id /api/v1/todo/:id', async () => {

    // agregacion de los unicos dos todos a evaluar
    const prismaTodo1 = await prisma.todo.create({ data: todo1 });
    
    const resp = await request( ServerTest.getServerApp )
      .get(`/api/v1/todo/${prismaTodo1.id}`)
      .expect(200);

    // evaluaciones
    expect( resp.body ).toEqual({
      id: prismaTodo1.id,
      text: prismaTodo1.text,
      createdAt: prismaTodo1.createdAt,
    });
    
  });


  /**
   * comprobar que se retorne un estatus 404 y error en caso de no encontrarse
   */
  test('should return a 404 status and error message /api/v1/todo/:id', async () => {

    const fakeTodoId : number = 888;

    const resp = await request( ServerTest.getServerApp )
      .get(`/api/v1/todo/${fakeTodoId}`)
      .expect(404);
    
    expect( resp.body ).toEqual({ message: expect.any(String) });
      
  });


  /**
   * conmprobar si al momento de crear regresa la informacion necesaria
   */
  test('should return a status code 201 and todo with id /api/v1/todo',  async () => {

    const resp = await request( ServerTest.getServerApp )
      .post('/api/v1/todo')
      .send( todo1 )
      .expect(201);
    
    expect( resp.body ).toEqual({
      id: expect.any(Number),
      ...todo1,
    });

  });


  /**
   * retornar un codigo de estado 400 por cuerpo de solicitud invalido
   */
  test('should return a status code 400 for empty body request /api/v1/todo',  async () => {
    // test 1
    const resp1 = await request( ServerTest.getServerApp )
      .post('/api/v1/todo')
      .send( {} )
      .expect(400);
    
    expect( resp1.body ).toEqual({ message: expect.any(String) });
  });


  /**
   * retornar un codigo de estado 400 por error de texto vacio o invalido
   */
  test('should return a status code 400 for empty or invaild text /api/v1/todo',  async () => {
    // test 1
    const resp1 = await request( ServerTest.getServerApp )
      .post('/api/v1/todo')
      .send( {...todo1, text: ''} )
      .expect(400);
    
    expect( resp1.body ).toEqual({ message: expect.any(String) });

    // test 2
    const resp2 = await request( ServerTest.getServerApp )
      .post('/api/v1/todo')
      .send( {...todo1, text: null} )
      .expect(400);
    
    expect( resp2.body ).toEqual({ message: expect.any(String) });
    
    // test 3
    const resp3 = await request( ServerTest.getServerApp )
      .post('/api/v1/todo')
      .send( {createdAt: null} )
      .expect(400);
    
    expect( resp3.body ).toEqual({ message: expect.any(String) });

  });

  
  /**
   * retornar un codigo de estado 400 por error de fecha invalida
   */
  test('should return a status code 400 for invaild createdAt /api/v1/todo',  async () => {
    // test 1
    const resp1 = await request( ServerTest.getServerApp )
      .post('/api/v1/todo')
      .send( {...todo1, createdAt: undefined} )
      .expect(400);
    
    expect( resp1.body ).toEqual({ message: expect.any(String) });

    // test 2
    const resp2 = await request( ServerTest.getServerApp )
      .post('/api/v1/todo')
      .send( {...todo1, createdAt: true} )
      .expect(400);
    
    expect( resp2.body ).toEqual({ message: expect.any(String) });
    
    // test 3
    const resp3 = await request( ServerTest.getServerApp )
      .post('/api/v1/todo')
      .send( {...todo1, createdAt: ''} )
      .expect(400);
    
    expect( resp3.body ).toEqual({ message: expect.any(String) });

  });


  /**
   * retornar un codigo de estado 200 si el todo fue actualizado
   */
  test('should return a status code 200 if update todo is success /api/v1/todo/:id',  async () => {

    const prismaTodoResp =  await prisma.todo.create({ data: todo2 });

    
    // test 1 - actualizar solo text
    const objectUpdated1 = {text: 'updated test'};
    const resp1 = await request( ServerTest.getServerApp )
      .put(`/api/v1/todo/${prismaTodoResp.id}`)
      .send(objectUpdated1)
      .expect(200);

    expect( resp1.body ).toEqual({
      id: prismaTodoResp.id,
      text: objectUpdated1.text,
      createdAt: todo2.createdAt?.toISOString(),
    });

    // test 2 - Actualizar solo fecha
    const objectUpdated2 = {createdAt: null};
    const resp2 = await request( ServerTest.getServerApp )
      .put(`/api/v1/todo/${prismaTodoResp.id}`)
      .send(objectUpdated2)
      .expect(200);

    expect( resp2.body ).toEqual({
      id: prismaTodoResp.id,
      text: resp1.body.text,
      ...objectUpdated2,
    });

    // test 3 - Actualizar ambos
    const objectUpdated3 = {...todo1};
    const resp3 = await request( ServerTest.getServerApp )
      .put(`/api/v1/todo/${prismaTodoResp.id}`)
      .send(objectUpdated3)
      .expect(200);

    expect( resp3.body ).toEqual({
      id: prismaTodoResp.id,
      ...objectUpdated3,
    });

  });

  
  /**
   * retornar un 404 en caso de que no se encuentre el todo a actualizar
   */
  test('should return a status code 404 and error message if todo update not found /api/v1/todo/:id', async () => {
    const fakeTodoId : number = 888;

    const resp = await request( ServerTest.getServerApp )
      .put(`/api/v1/todo/${fakeTodoId}`)
      .send( todo1 )
      .expect(404);
      
    expect( resp.body ).toEqual({ message: expect.any(String) });
  });


  /**
   * retornar un 400 en caso de enviar un body invalido
   */
  test('should return a status code 400 and error message if todo body update request is invaild /api/v1/todo/:id', async () => {
    const fakeTodoId : number = 888;

    const resp = await request( ServerTest.getServerApp )
      .put(`/api/v1/todo/${fakeTodoId}`)
      .send( {/**Si el body es objeto vacio o no contiene las propiedades actualizar */} )
      .expect(400);
      
    expect( resp.body ).toEqual({ message: expect.any(String) });
  });


  /**
   * retornar un 400 en caso de enviar un body con propiedades con valores invalidos
   */
  test('should return a status code 400 and error message if todo body update request is invaild properties values /api/v1/todo/:id', async () => {

    const prismaTodoResp =  await prisma.todo.create({ data: todo1 });
    
    // test 1 - No se permite null en text
    const resp1 = await request( ServerTest.getServerApp )
      .put(`/api/v1/todo/${prismaTodoResp.id}`)
      .send( {text: null} )
      .expect(400);
      
    expect( resp1.body ).toEqual({ message: expect.any(String) });

    // test 2 - no se permite string vacio en text
    const resp2 = await request( ServerTest.getServerApp )
      .put(`/api/v1/todo/${prismaTodoResp.id}`)
      .send( {text: ''} )
      .expect(400);
      
    expect( resp2.body ).toEqual({ message: expect.any(String) });

    // test 3 - No se permite boolean en text
    const resp3 = await request( ServerTest.getServerApp )
      .put(`/api/v1/todo/${prismaTodoResp.id}`)
      .send( {text: true} )
      .expect(400);
      
    expect( resp3.body ).toEqual({ message: expect.any(String) });

    // test 4 - No se permite booleanos en fecha
    const resp4 = await request( ServerTest.getServerApp )
      .put(`/api/v1/todo/${prismaTodoResp.id}`)
      .send( {createdAt: true} )
      .expect(400);
      
    expect( resp4.body ).toEqual({ message: expect.any(String) });

    // test 5 - no se permite string vacio en fecha
    const resp5 = await request( ServerTest.getServerApp )
      .put(`/api/v1/todo/${prismaTodoResp.id}`)
      .send( {createdAt: ''} )
      .expect(400);
      
    expect( resp5.body ).toEqual({ message: expect.any(String) });

    // test 6 - no permite formato fecha invalido
    const resp6 = await request( ServerTest.getServerApp )
      .put(`/api/v1/todo/${prismaTodoResp.id}`)
      .send( {createdAt: 'aa/01/2000'} )
      .expect(400);
      
    expect( resp6.body ).toEqual({ message: expect.any(String) });
  });


  /**
   * se espera un status 200 y un todo al momento de eliminar
   */
  test('should return a status code 200 and todo deleted /api/v1/todo/:id', async () => {

    const prismaTodoResp =  await prisma.todo.create({ data: todo2 });

    const resp = await request( ServerTest.getServerApp )
      .delete(`/api/v1/todo/${prismaTodoResp.id}`)
      .expect(200);

    expect( resp.body ).toEqual({
      message: expect.any(String),
      todo: {
        ...prismaTodoResp,
        createdAt: prismaTodoResp.createdAt?.toISOString(),
      }
    });

  });


  /**
   * se espera un 404 en caso de no encontrar el todo a eliminar
   */
  test('should return a status code 404 if todo not found /api/v1/todo/:id', async () => {
    const fakeTodoId : number = 888;

    const resp = await request( ServerTest.getServerApp )
      .delete(`/api/v1/todo/${fakeTodoId}`)
      .expect(404);

    expect( resp.body ).toEqual({ message: expect.any(String) });
  });

});