import { describe, test, expect } from '@jest/globals';
import { template } from "../../../src/js-foundation/01-template"

describe('js-foundation/01-template.ts', () => {
    // debe contener un saludo como el especificado
    test('template should contain a greeting', () => {
        expect(template).toContain('Hola que tal, ')
    });

    // debe contener una expresion especifica
    test('template should {{name}}', () => {
        expect(template).toMatch(/{{name}}/);
    })
})