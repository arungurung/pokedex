import { NamedAPIResourceList } from '../types';
import { fetchPokemon } from './fetchPokemon';

export const fetchPokemonList = async (page = 1) => {
  const offset = 9 * (page - 1);
  const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=9`;

  const data = (await fetch(URL).then((response) =>
    response.json()
  )) as NamedAPIResourceList;
  console.log('data', data);

  const promises = data.results.map(
    async (pokemon: { name: string }) => (await fetchPokemon(pokemon.name)).data
  );
  console.log('promises', promises);

  const pokemonList = Promise.all(promises);
  console.log('pokemonList', pokemonList);

  return pokemonList;
};
