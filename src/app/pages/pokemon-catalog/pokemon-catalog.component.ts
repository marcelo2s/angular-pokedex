import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/models/pokemon.model';
import { NgFor, NgIf } from '@angular/common';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-catalog',
  standalone: true,
  imports: [CardComponent, PaginationComponent, NgFor, NgIf],
  templateUrl: './pokemon-catalog.component.html',
  styleUrl: './pokemon-catalog.component.scss'
})
export class PokemonCatalogComponent implements OnInit {
  private service = inject(PokemonService);
  private router = inject(Router);
  pokemons = signal<Pokemon[]>([]);
  loading = signal(true);

  limit = 12;
  page = 1;
  count = 0;

  ngOnInit() {
    this.loadPage();
  }

  onPageChange(page: number) {
  this.page = page;
  this.loadPage();
}

loadPage() {
  const offset = (this.page - 1) * this.limit;
  this.service.getPokemons(this.limit, offset).subscribe({
    next: res => {
      this.pokemons.set(res);
      this.loading.set(false);
      this.count = 1302;
    }
  });
}

  goToDetails(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.name]);
  }
}
