const pagination = document.querySelector('#pagination')
const loadMoreButton = document.querySelector('#loadMore')
const pokemonsList = document.querySelector('#pokemonsList')
const maxRecords = 151
const limitIni = 12
const limit = 10
let offset = 0
function backgronudMultipleTypes(pokemonDetail) {
    let size = pokemonDetail.length
    if (size > 1) return `style="background: linear-gradient(135deg,${pokemonDetail.map((type) => `var(--${type})`)})"`
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        console.log(pokemons)
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" ${backgronudMultipleTypes(pokemon.types)}>
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
    `).join('')
        pokemonsList.innerHTML += newHtml
    }).catch((error) => { console.error('error: ', error) })
}
loadPokemonItens(offset, limitIni)
loadMoreButton.addEventListener('click', () => {
    offset += limitIni
    let qntRecordsNextPage = offset + limit
    if (qntRecordsNextPage >= maxRecords) {
        let newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentNode.removeChild(loadMoreButton);
    } else loadPokemonItens(offset, limit)
})
