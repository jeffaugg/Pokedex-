const typeColor = {
  normal: "#a6a877",
  grass: "#77c850",
  fire: "#ee7f30",
  water: "#678fee",
  electric: "#f7cf2e",
  ice: "#98d5d7",
  ground: "#dfbf69",
  flying: "#a98ff0",
  poison: "#a040a0",
  fighting: "#bf3029",
  psychic: "#f65687",
  dark: "#725847",
  rock: "#b8a137",
  bug: "#a8b720",
  ghost: "#6e5896",
  steel: "#b9b7cf",
  dragon: "#6f38f6",
  fairy: "#f9aec7",
};
const pokeApi = {};

function convertPokeApiDetailToPokemon(pokemonDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokemonDetail.id;
  pokemon.name = pokemonDetail.name;

  const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type1] = types;
  pokemon.types = types;
  pokemon.type = type1;
  pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

function convertPokeApiDetailToPokemonCard(pokemonDetail) {
  const pokemonCard = new PokemonDetail();

  pokemonCard.hp = pokemonDetail.stats[0].base_stat;
  pokemonCard.photo = pokemonDetail.sprites.other.dream_world.front_default;
  const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
  pokemonCard.types = types;
  pokemonCard.name =
    pokemonDetail.name[0].toUpperCase() + pokemonDetail.name.slice(1);
  pokemonCard.statAttack = pokemonDetail.stats[1].base_stat;
  pokemonCard.statDefense = pokemonDetail.stats[2].base_stat;
  pokemonCard.statSpeed = pokemonDetail.stats[5].base_stat;
  pokemonCard.themerColor = typeColor[pokemonDetail.types[0].type.name];

  return pokemonCard;
}

pokeApi.getPokemonDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 3) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url) // faço a requisiçao na url
    .then((responseFetch) => responseFetch.json()) // espero e converto a resposta em json
    .then((responseJson) => responseJson.results) // retorna apenas o results do json
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails)) // chama a funçao para acessar a url especifica do pokemon
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.showPokemonDetails = (pokemonNumber) => {
  const urlDetail = "https://pokeapi.co/api/v2/pokemon/";
  const finalUrl = urlDetail + pokemonNumber;

  return fetch(finalUrl)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemonCard);
};
