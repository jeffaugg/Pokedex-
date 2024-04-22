const pokemonOl = document.getElementById(`pokemonList`);
const loadMoreButton = document.getElementById(`loadMoreButton`);
const maxRecords = 152;
const limit = 12;
let offset = 0;


// Função para estilizar um card de Pokémon com uma cor específica
let styleCard = (card, color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};


// Função para carregar os detalhes de um Pokémon selecionado
function loadPokemonCard(pokemon){
  const divclass = document.getElementById('pokemonDetailsContainer');
  const body = document.body;
  const detailsHtml = `
  <div id="card">
        <p class="hp">
            <span> Hp</span>
            ${pokemon.hp}
        </p>

        <img src="${pokemon.photo}" alt="${pokemon.name}">

        

        <h2 class="poke-name">
            ${pokemon.name}
        </h2>
        <div class="types">
            ${pokemon.types
              .map((type) => `<span class="type ${type}">${type}</span>`)
                    .join("")
            }
        </div>
        <div class="stats">
          <div>
            <h3>${pokemon.statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
          <h3>${pokemon.statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>${pokemon.statSpeed}</h3>
            <p>Speed</p>
          </div>
        </div>
      </div>
      <button id="btn">Voltar</button>
    </div>
  `;

 
  
  // Remove o link do CSS anterior e adiciona o link do novo CSS
  var linkAnterior = document.querySelector('link[href="/assets/css/pokedex.css"]');
  document.getElementsByTagName('head')[0].removeChild(linkAnterior);

  var link = document.createElement('link');
  // Define os atributos do link
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'assets/css/detail.css';
  // Adiciona o estilo CSS para detalhes do Pokémon
  document.getElementsByTagName('head')[0].appendChild(link);
  
  // Atualiza o HTML do corpo da página com os detalhes do Pokémon
  body.innerHTML = detailsHtml;
  const card = document.getElementById('card');
  
  // Adiciona o evento de recarregar a página ao botão "Voltar"
  const btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    location.reload();
  });
  // Aplica o estilo ao card do Pokémon
  styleCard(card, pokemon.themerColor);

}


// Função para carregar os itens de Pokémon
function loadPokemonItens(offset, limit) {
  // Usa a API pokeApi para obter uma lista de Pokémon
  // Gera HTML para cada Pokémon e adiciona ao pokemonOl
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => ` 
      <li class="pokemon ${pokemon.type}" data-number="${pokemon.number}">
          <span class="number"> #${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
      
            <div class="detail">
                <ol class="types">
                  ${pokemon.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}
                </ol>
                <img src="${pokemon.photo}" 
                      alt="${pokemon.name}">
                      
            </div>
      </li>`
      )
      .join("");
    // map itera sobre os elementos aplicando uma função e retornando um novo array com os resultados.
    // join concatena uma array e retorna uma string separadas pelo parametro

    pokemonOl.innerHTML += newHtml;

    // Adicionando evento de clique a cada item da lista
    const pokemonItems = document.querySelectorAll(".pokemon");
    pokemonItems.forEach((item) => {
      item.addEventListener("click", () => {
        const pokemonNumber = item.getAttribute("data-number");
        //chamar uma função para exibir os detalhes do Pokémon com o número obtido
        pokeApi.showPokemonDetails(pokemonNumber).then(loadPokemonCard);
      });
    });
  });
}

// Adiciona um evento de clique ao botão "Load More" para carregar mais Pokémon
loadMoreButton.addEventListener("click", () => {
  // Atualiza o offset e carrega mais Pokémon
  offset += limit;
  const qtdRecordNexPage = offset + limit;
  if (qtdRecordNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
    return;
  }
  loadPokemonItens(offset, limit);
});



// Carrega os primeiros Pokémon
loadPokemonItens(offset, limit);
