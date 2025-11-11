import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../core/models/pokemon.model';
import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe, UpperCasePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input('pokemon') item!: Pokemon;
  @Output() select = new EventEmitter<Pokemon>();
  @Output() delete = new EventEmitter<Pokemon>();
  imageError = false;
}
