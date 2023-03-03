import axios from 'axios';
import { useQuery } from 'react-query';
import { Pokemon, PokemonsList } from '../types';

const client = 'https://pokeapi.co/api/v2';

export const getPokemons = () =>
  axios
    .get<PokemonsList>(`${client}/pokemon?limit=1510`)
    .then((res) => res.data);

export const getPokemon = (name: string) =>
  axios.get<Pokemon>(`${client}/pokemon/${name}`).then((res) => res.data);

export const useFetchPokemons = () =>
  useQuery<PokemonsList, Error>('getPokemons', getPokemons);

export const useFetchPokemon = (name: string) =>
  useQuery<Pokemon, Error>(`${name}`, () => getPokemon(name));
