import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../core/models/pokemon.model';
import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, TitleCasePipe, UpperCasePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input('pokemon') item!: Pokemon;
}
