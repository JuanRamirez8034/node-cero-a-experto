import { describe, test, expect } from '@jest/globals';
import { makeBuildPerson } from './../../../src/js-foundation/05-factory';



describe('js-foundation/05-factory', () => {

    const getAge = () => 23;
    const generateId = () => 'yourid';
    const makePerson = makeBuildPerson({generateId, getAge});

    // debe retornar una funcion
    test('makeBuildPerson should return a function', () => {
        expect(typeof makePerson).toBe('function');
    });

    // la funcion makePerson debe retornar una persona valida
    test('makePerson should return a person', () => {
        const person = makePerson({name: 'Juan', birthday: '2001-03-16'});
        expect(person).toEqual({ id: 'yourid', name: 'Juan', age: 23 });
    });
});