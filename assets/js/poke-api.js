const pokeApi = {};


pokeApi.getPokemonDetails = (pokemon) =>{
    return fetch(pokemon.url)
        .then((response) => response.json())
}

pokeApi.getPokemon = (offset = 0, limit = 12) => {
  // parametros sao os valores defauts
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((responseFetch) => responseFetch.json())
    .then((responseJson) => responseJson.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
   
};
