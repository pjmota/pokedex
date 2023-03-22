import { IPokemonList } from './../../models/pokemonsList';
import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-poke-cards',
  templateUrl: './poke-cards.component.html',
  styleUrls: ['./poke-cards.component.scss']
})
export class PokeCardsComponent implements OnInit {

  allPokemons: any = [];
  allPokemonsNew: any = new Array();
  allPokemonsFiltered: any = new Array();


  constructor(private pokemonService: PokeApiService) { }

  ngOnInit(): void {
    this.getPokemonList()
  }

  getPokemonList() {

    this.pokemonService.getPokemonListTeste()
      .subscribe({
        next: (response: any) => {
          response.map((e: any) => {
            this.pokemonService.getStatusPokemonsTeste(e.url)
              .subscribe({
                next: (response: any) => {
                  e.status = response;
                  this.pokemonService.getEvolutionPokemonTeste(response.species.url)
                    .subscribe({
                      next: (response: any) => {
                        e.evolution = response;
                      }
                    })
                }
              })
          })
          setTimeout(() => {
            this.allPokemonsNew = response;
            this.filterPokemonNotEvolved();
          }, 100);
        }
      })

    this.pokemonService.getPokemonList()
      .pipe(
        finalize(() => {

        })
      )
      .subscribe({
        next: (response: any) => {
          this.allPokemons = response;
        },
        error: (error: any) => {
          console.log('erro', error);
        }
      })
  }

  filterPokemonNotEvolved() {
    console.log(this.allPokemonsNew)
    this.allPokemonsNew.forEach((e: any) => {
      console.log(e.evolution.base_happiness)
      /*  if (e.evolution.evolves_from_species !== undefined) {
         this.allPokemonsFiltered.push(e);
       } */
    });
    /* this.allPokemonsNew.map((e: any) => {
      console.log(e.evolution)
      if (e.evolution.evolves_from_species !== undefined) {
        this.allPokemonsFiltered.push(e);
      }
    }) */
  }

}
