import { describe, test, expect } from '@jest/globals';
import { getPokemonById } from '../../../src/js-foundation/06.2-promises-async-await';



describe('js-foundation/06.2-promises-async-await', () => {

    // validar que regrese un pokemon
    test('getPokemonById should return a pokemon', async () => {
        const pokemonId = 1;
        const pokemonName = await getPokemonById(pokemonId);
        expect(pokemonName).toBe('bulbasaur');        
    });

    // validar error en caso de que no exitas el pokemon con la id proporcionada
    test('getPokemonById should a error', async () => {
        const pokemonId = 99999999999;
        try {
            await getPokemonById(pokemonId);            
            expect(true).toBeFalsy(); // ese error no se deberia mostrar
        } catch (error) {
            expect(error).toBe(`Pokemon with id '${pokemonId}' not found`)
        }
        // tambien se puede resumir de esta forma capturando un throw new Error()
        // await expect(getPokemonById(pokemonId)).rejects.toThrow(`Pokemon with id '${pokemonId}' not found`)
    })
});