const { httpClient, httpClientV2 } = require('../plugins/index')

const getPokemonById = async (id) => {
  const _API_   = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemon = await httpClientV2.get(_API_);
  return pokemon.name;
};

module.exports = getPokemonById;