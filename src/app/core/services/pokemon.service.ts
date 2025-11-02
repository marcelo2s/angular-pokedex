import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  /**
   * Lista pokémons com paginação.
   * @param limit Quantos pokémons retornar por página.
   * @param offset A partir de qual índice começar (ex: 0, 20, 40...).
   */
  getPokemons(limit = 20, offset = 0): Observable<Pokemon[]> {
    return this.http
        .get<{ results: { name: string, url: string }[] }>(
            `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`
        )
        .pipe(
            switchMap(response =>
                forkJoin(response.results.map(r => this.getPokemon(r.name))) as Observable<Pokemon[]>
            )
        );
  }

  getPokemon(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${nameOrId}`);
  }


  /**
   * Busca os detalhes de um Pokémon pelo nome ou ID.
   * @param nameOrId Nome ou ID do Pokémon (ex: "pikachu" ou 25).
   */
  getPokemonDetails(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${nameOrId}`);
  }

  /**
   * Busca informações extras da espécie do Pokémon (opcional).
   * @param nameOrId Nome ou ID do Pokémon.
   */
  getPokemonSpecies(nameOrId: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon-species/${nameOrId}`);
  }
}
