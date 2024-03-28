import { describe, test, expect, jest } from '@jest/globals';
import { getAge } from '../../../src/plugins/get-age.plugin';

describe('plugins/get-age.plugin', () => {
    // debe regresar un numero
    test('getAge should return a number', ()=> {
        const birthaday = '2001-03-16';
        const age = getAge(birthaday);
        expect(typeof age).toBe('number');
    });

    // debe regresar un numero equivalente a una edad
    test('getAge should return a number', ()=> {
        const birthaday = '2001-03-16';
        const age = getAge(birthaday);
        const auxAge = auxGetAge(birthaday);
        expect(age).toBe(auxAge);
    });

    // El metodo debe regresar '0', para esto se utiliza un 'spyOn'
    test('getAge should return 0 value', () => {
        // alteramos los resultados que deben arrojar los metodos de 'Date' para que sean constantes
        const spyYear = jest.spyOn(Date.prototype, 'getUTCFullYear').mockReturnValue(2001);
        const spyMonth = jest.spyOn(Date.prototype, 'getUTCDate').mockReturnValue(3);
        // utilizamos la fucion de forma convencional
        const birthDay = '2001-03-16';
        const age = getAge(birthDay);
        // verificamos
        expect(age).toBe(0);                 // el resultado debe ser igual a 0
        expect(spyMonth).toHaveBeenCalled(); // debe haber sido llamado al menos una vez el espia de mes
        expect(spyYear).toHaveBeenCalled();  // debe haber sido llamado al menos una vez el espia del año
        
    })
});


const auxGetAge = (birthday: string): number => {
    const today = new Date()
    const birthDate = new Date(birthday)
    let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
    const month = today.getUTCMonth() - birthDate.getUTCMonth()
    if (month < 0 || (month === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
        age--
    }
    return age
}