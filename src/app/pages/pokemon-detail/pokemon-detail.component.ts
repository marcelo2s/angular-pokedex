import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { EvolutionService } from '../../core/services/evolution.service';

@Component({
  standalone: true,
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  private evolutionService = inject(EvolutionService);

  pokemon = signal<any>(null);
  evolutions = signal<string[]>([]);
  loading = signal(true);

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.loadPokemon(name);
    }
  }

  loadPokemon(name: string) {
    this.pokemonService.getPokemonByName(name).subscribe({
      next: (data) => {
        this.pokemon.set(data);
        this.loading.set(false);
        this.loadEvolutions(name);
      },
      error: () => this.loading.set(false),
    });
  }

  loadEvolutions(name: string) {
    this.evolutionService.getEvolutionChain(name).subscribe({
      next: (data) => this.evolutions.set(data),
      error: () => this.evolutions.set([]),
    });
  }

  formatId(id: number): string {
    return id.toString().padStart(3, '0');
  }
}
