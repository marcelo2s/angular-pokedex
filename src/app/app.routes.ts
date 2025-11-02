import { Routes } from '@angular/router';
import { PokemonCatalogComponent } from './pages/pokemon-catalog/pokemon-catalog.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';

export const routes: Routes = [
    { path: '', component: PokemonCatalogComponent },
    { path: 'pokemon/:code', component: PokemonDetailsComponent },
    { path: '**', redirectTo: '' }
];
