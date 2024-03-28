import { httpClient, httpClientV2 } from '../plugins/index';

interface Pokemon {
  id: number;
  name:string;
}

export const getPokemonById = async (id:number|string) : Promise<string> => {
  try {
    const _API_   = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemon = await httpClientV2.get<Pokemon>(_API_);
    return pokemon.name;
  } catch (error) {
    // throw new Error (`Pokemon with id '${id}' not found`);
    throw `Pokemon with id '${id}' not found`;
  }
};