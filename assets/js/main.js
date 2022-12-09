const offset = 0
const limit = 10
const baseUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

function convertPokemonToHtml(pokemon) {
    return `
            <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        <li class="type">grass</li>
                        <li class="type">poison</li>
                    </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                        alt="${pokemon.name}">
                </div>
            </li>
    `
}
const pokemonsList = document.querySelector('#pokemonsList')
try {
    fetch(baseUrl)
        .then(response => {
            const responseJson = response.json()
            return responseJson
        })
        .then(async data => {
            const pokemons = data.results
            for (const pokemon of pokemons) {
                pokemon.data = await fetch(pokemon.url).then(res => res.json())
            }
            console.log(pokemons)
            return pokemons
        })
        .then((pokemons) => {
            debugger
            for (const pokemon of pokemons) {
                pokemonsList.innerHTML += convertPokemonToHtml(pokemon)
            }
        })

        .catch(error => {
            console.error(error)
        })
} catch (error) {
    console.error(error)
}