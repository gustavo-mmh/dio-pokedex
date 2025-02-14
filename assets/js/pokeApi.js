const pokeApi = {}



function convertPokemonDetailToPokemon(pokemonDetail) {
  const pokemon = new Pokemon
  pokemon.number = pokemonDetail.id
  pokemon.name = pokemonDetail.name
  const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  pokemon.types = types
  pokemon.type = type
  pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default
  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url).then(response => response.json())
    .then(convertPokemonDetailToPokemon)
}
pokeApi.getPokemons = (offset = 0, limit = 1) => {
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  return fetch(baseUrl)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailsRequests) => Promise.all(detailsRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => { console.error(`error: ${error}`) })
}
