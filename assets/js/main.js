  
function convertPokemonTypesToLi(pokemonTypes){
  return pokemonTypes.map(typeSlot => `<li class="type">${typeSlot.type.name}</li>`);
}

function convertPokemonToLi(pokemon) {
  return ` 
  <li class="pokemon">
      <span class="number"> #${pokemon.order}</span>
      <span class="name">${pokemon.name}</span>
  
        <div class="detail">
            <ol class="types">
              ${convertPokemonTypesToLi(pokemon.types).join('')}
            </ol>
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
        </div>
  </li>`;
}

const pokemonOl = document.getElementById(`pokemonList`);

pokeApi.getPokemon().then((pokemons = []) => {
  const newHtml = pokemons.map(convertPokemonToLi).join("");
  pokemonOl.innerHTML = newHtml;
});
// map itera sobre os elementos aplicando uma função e retornando um novo array com os resultados.
// join concatena uma array e retorna uma string separadas pelo parametro
