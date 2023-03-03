export type PokemonResponse = {
  name: string;
  url?: string;
};

export type PokemonsList = {
  count: number;
  next?: string;
  previous?: string | null;
  results: PokemonResponse[];
};
