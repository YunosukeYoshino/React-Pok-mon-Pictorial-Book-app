export interface Ability {
  // 必要なプロパティを追加してください
  ability: {
    name: string;
    url: string;
  };
}

export interface Type {
  type: {
    name: string;
    url: string;
  };
  // 必要なプロパティを追加してください
}

export interface PokemonDetails {
  abilities: Ability[];
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: string[];
  name: string;
  order: number;
  sprites: sprites;
  types: Type[];
  weight: number;
}

export interface PokemonData {
  id: number;
  poke: PokemonDetails;
}

interface PokeData {
  name: string;
  url: string;
}

export type PokeArray = PokeData[];

interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface sprites {
  front_default: string | undefined;
  back_default: string;
}
