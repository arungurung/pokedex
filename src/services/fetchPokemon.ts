import { Pokemon } from '../types';

export const fetchPokemon = async (pokemon: string) => {
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  let response;
  let data: Pokemon;
  let error;

  try {
    data = (await fetch(URL).then((res) => res.json())) as Pokemon;
    error = false;
  } catch {
    data = {} as Pokemon;
    error = true;
  }

  return { response, data, error };
};
