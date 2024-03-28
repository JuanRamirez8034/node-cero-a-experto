import { getUserById } from '../../../src/js-foundation/03-callbacks';
import { describe, expect, test } from '@jest/globals';

describe('js-foundation/03-callbacks', () => {
    // la funcion a traves de su callback debe retornar un error
    test('getUserById should return an error', (done)=> {
        const userId = 5;

        getUserById(userId, (err, user) => {

            expect(err).toBe(`User with id ${userId} no found`);
            expect(user).toBeUndefined();

            done();
        });
    });

    // la funcion debe retornar un usuario valido
    test('getUserById should a user with id type number and name "User number one"', (done) => {
        const userId = 1;

        getUserById(userId, (err, user) => {
            expect(err).toBeUndefined();                    // error debe ser indefinido
            expect(user).toHaveProperty('name');            // debe tener una propiedad "name"
            expect(user!.name).toBe('User number one');     // en la propiedad "name" debe ser lo especificado
            expect(user).toHaveProperty('id');              // debe tener una propiedad "id"
            expect(typeof user!.id).toBe('number');         // debe ser igual a tipo "number"
            expect(user).toEqual({
                id: 1, name: "User number one"});           // Debe ser igual a lo especificado (es redundante en este caso)
        });

        done();
    });
});