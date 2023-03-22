import { Observable } from "rxjs"

export interface IPokemon {
  count: number,
  next: string,
  previous: string,
  results: Array<IPokemonList>
};

export interface IPokemonList {
  name: string,
  url: string,
  status: Array<any>,
  evolution: Array<any>
}

export interface ISpecies {
  species: {
    name: string,
    url: string,
  }
}