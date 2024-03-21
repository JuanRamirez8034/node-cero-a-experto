
const getPokemonById = (id) => {
  const _API_ = `https://pokeapi.co/api/v2/pokemon/${id}`;

  return fetch(_API_)
   .then(resp => resp.json())
   .then(pokemon => pokemon.name);
};

module.exports = getPokemonById;