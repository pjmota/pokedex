import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, firstValueFrom, switchMap, mergeMap, from } from 'rxjs';
import { IPokemon, IPokemonList, ISpecies } from '../models/pokemonsList';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private readonly API: string = 'https://pokeapi.co/api/v2'

  constructor(private http: HttpClient) { }

  getPokemonList() {
    return this.http.get<IPokemon>(
      `${this.API}/pokemon?offset=0&limit=100`).pipe(
        map(data => data.results),
        tap(data =>
          data.forEach(async item => {
            item.status = await firstValueFrom(this.getStatusPokemons(item));
            return item;
          })
          /* data.filter(async item => {
          item.status = await firstValueFrom(this.getStatusPokemons(item));
          return item; */
          /* }) */
        ),
      )
  }

  public getStatusPokemons(pokemon: IPokemonList): Observable<any> {
    return this.http.get<any>(pokemon.url).pipe(
      tap(
        async data => {
          data.evolution = await firstValueFrom(this.getEvolutionPokemon(data.species.url))
          return data
        }
      )
    )
  }

  public getEvolutionPokemon(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getPokemonListTeste() {
    return this.http.get<IPokemon>(`${this.API}/pokemon?offset=0&limit=100`).pipe(map(data => data.results));
  }

  getStatusPokemonsTeste(url: string) {
    return this.http.get<any>(url).pipe(
      map(res => {
        return res;
      })
    )
  }

  getEvolutionPokemonTeste(url: string) {
    return this.http.get<any>(url).pipe(
      map(res => {
        return res;
      })
    )
  }
}
