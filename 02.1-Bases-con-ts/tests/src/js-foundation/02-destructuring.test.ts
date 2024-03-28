import { namesArr } from './../../../src/js-foundation/02-destructuring';
import { describe, test, expect } from '@jest/globals';


describe('ja-foundation/destructuring.ts', () => {
    // el arreglo debe contener lo especificado
    test('namesArr should contain name1, name3', () => {
        expect(namesArr).toContain('name 1')
        expect(namesArr).toContain('name 3')
    });
    // el arreglo debe contener los valores en el orden especificado
    test('namesArr should contain in fisrt position "name 1", and the last position "name 3"', () => {
        const [name1, , name3] = namesArr;        
        expect(name1).toContain('name 1');
        expect(name3).toContain('name 3');
    })
})