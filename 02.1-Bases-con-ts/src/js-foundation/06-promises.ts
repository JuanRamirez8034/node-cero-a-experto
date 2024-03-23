
export const getPokemonById = (id:number|string, callback:(err?:string, pokemonName?:string)=>void) => {
  const _API_ = `https://pokeapi.co/api/v2/pokemon/${id}`;

  fetch(_API_)
   .then(resp => {
      resp.json()
       .then(pokemon => {
        callback(undefined, pokemon.name);
      })
       .catch(reject => {
        callback('Parse json error', undefined);
      });
   })
    .catch(reject => {
      callback('Fech error', undefined);
  });
};