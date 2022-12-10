const pokeApi = {}
pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  return fetch(baseUrl)
    .then((response) => response.json())
    .then(async data => {
      const pokemons = data.results
      for (const pokemon of pokemons) {
        pokemon.data = await fetch(pokemon.url).then(res => res.json())
      }
      return pokemons
    })
    .catch((error) => { console.error(error) })
}
