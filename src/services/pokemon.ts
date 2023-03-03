import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NamedAPIResourceList, Pokemon } from '../types';
import { fetchPokemon } from './fetchPokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name: string) => `/${name}`,
    }),
    getPokemonById: builder.query<Pokemon, string>({
      query: (id: string) => `/${id}`,
    }),
    getAllPokemon: builder.query<NamedAPIResourceList, string>({
      query: () => '?limit=60&offset=60',
    }),
    fetchPokemon: builder.query<Pokemon, string>({
      query: (name: string) => `/${name}`,
    }),
    fetchPokemonList: builder.query<NamedAPIResourceList, number>({
      query: (offset: number) => `?offset=${offset}&limit=9`,
      transformResponse: (response: NamedAPIResourceList) => {
        return response.results.map((pokemon) => fetchPokemon(pokemon.name));
      },
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetAllPokemonQuery,
  useGetPokemonByIdQuery,
  useFetchPokemonListQuery,
} = pokemonApi;
