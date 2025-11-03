import { Routes } from '@angular/router';
import { PokemonCatalogComponent } from './pages/pokemon-catalog/pokemon-catalog.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
    { path: '', component: PokemonCatalogComponent },
    {
        path: 'pokemon/:name',
        loadComponent: () => 
            import('./pages/pokemon-detail/pokemon-detail.component').then(m => m.PokemonDetailComponent)
    },
    { path: '**', redirectTo: '' }
];
