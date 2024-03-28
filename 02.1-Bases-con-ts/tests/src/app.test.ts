import { describe, expect, it, test } from '@jest/globals';

// Todas las pruebas se basan en la primicia "AAA"
// - Arrange : Organizar
// - Act : Actuar
// - Assert : Afirmar

describe('Test at App file', () => {
    test('should be 30', () => {
        // 1.Arrange
        const const1 = 10;
        const const2 = 20;

        // 2.Act
        const result = const1 + const2;

        // 3.Asset
        expect(result).toBe(30)
    })
});