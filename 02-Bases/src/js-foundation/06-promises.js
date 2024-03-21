
const getPokemonById = (id, callback) => {
  const _API_ = `https://pokeapi.co/api/v2/pokemon/${id}`;

  fetch(_API_)
   .then(resp => {
      resp.json()
       .then(pokemon => {
        callback(null, pokemon.name);
      })
       .catch(reject => {
        callback('Parse json error', null);
      });
   })
    .catch(reject => {
      callback('Fech error', null);
  });
};

module.exports = getPokemonById;