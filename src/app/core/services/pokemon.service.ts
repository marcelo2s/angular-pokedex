import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly API_URL = 'https://pokeapi.co/api/v2';
  private cachedList: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  /**
   * 🔹 Retorna uma lista de Pokémons com seus detalhes básicos.
   */
  getPokemons(limit = 15, offset = 0): Observable<Pokemon[]> {
    return this.http
      .get<{ results: { name: string; url: string }[] }>(
        `${this.API_URL}/pokemon?limit=${limit}&offset=${offset}`
      )
      .pipe(
        switchMap((response) => {
          const requests = response.results.map((p) =>
            this.http.get<Pokemon>(p.url)
          );
          return forkJoin(requests);
        }),
        map((list) => {
          this.cachedList = list;
          return list;
        })
      );
  }

  /**
   * 🔹 Retorna os detalhes completos de um Pokémon pelo nome.
   * Compatível com o tipo `Pokemon`.
   */
  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.API_URL}/pokemon/${name}`).pipe(
      map((data) => ({
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types,
        abilities: data.abilities,
        stats: data.stats,
        sprites: data.sprites,
        species: data.species,
      }))
    );
  }

  cacheList(list: Pokemon[]) {
    this.cachedList = list;
  }

  getCachedList(): Pokemon[] {
    return this.cachedList;
  }

  hasCachedList(): boolean {
    return this.cachedList.length > 0;
  }
}
