import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EvolutionService {
  private readonly API_URL = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  /**
   * Retorna a cadeia de evolução de um Pokémon (por nome).
   * Exemplo de retorno: ['bulbasaur', 'ivysaur', 'venusaur']
   */
  getEvolutionChain(pokemonName: string): Observable<string[]> {
    if (!pokemonName) return of([]);

    // 1️⃣ Busca informações da espécie
    return this.http.get<any>(`${this.API_URL}/pokemon-species/${pokemonName}`).pipe(
      switchMap(species => {
        // 2️⃣ Extrai a URL da cadeia de evolução
        const evoUrl = species?.evolution_chain?.url;
        if (!evoUrl) return of([]);
        return this.http.get<any>(evoUrl);
      }),
      // 3️⃣ Extrai os nomes de todos os pokémons da cadeia
      map(chainData => {
        if (!chainData?.chain) return [];

        const evolutions: string[] = [];
        let current = chainData.chain;

        while (current) {
          evolutions.push(current.species.name);
          current = current.evolves_to?.[0];
        }

        return evolutions;
      })
    );
  }
}
