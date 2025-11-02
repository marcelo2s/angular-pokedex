import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pagination',
  imports: [NgIf, NgFor],
  template: `
    <nav class="pagination" *ngIf="totalPages > 1">
      <button (click)="prevPage()" [disabled]="currentPage === 1" aria-label="Anterior">←</button>

      <ng-container *ngFor="let item of visiblePages()">
        <button
          *ngIf="item !== '...'; else dots"
          (click)="goToPage(item)"
          [class.active]="item === currentPage">
          {{ item }}
        </button>
        <ng-template #dots>
          <span class="dots">...</span>
        </ng-template>
      </ng-container>

      <button (click)="nextPage()" [disabled]="currentPage === totalPages" aria-label="Próxima">→</button>
    </nav>
  `,
  styles: [`
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      margin-top: 1.5rem;
      flex-wrap: nowrap;
      overflow-x: auto;
    }

    button {
      background: #e53935;
      border: none;
      color: white;
      padding: 0.4rem 0.8rem;
      border-radius: 0.4rem;
      cursor: pointer;
      font-weight: 500;
      font-family: 'Rajdhani', sans-serif;
      transition: background 0.2s ease;
      flex-shrink: 0;
    }

    button:hover:not(:disabled) {
      background: #c62828;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .active {
      background: #b71c1c;
      font-weight: 700;
    }

    .dots {
      color: #b71c1c;
      font-weight: bold;
      padding: 0 0.5rem;
    }
  `]
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 12;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  /** 🔹 Gera as páginas visíveis, com "..." entre blocos distantes */
  visiblePages() {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 1; // páginas vizinhas de cada lado
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    // Sempre mostrar a primeira e última
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
    if (total > 1) range.push(total);

    // Adiciona "..." onde houver intervalo grande
    let last: number | undefined;
    for (const page of range) {
      if (last) {
        if (typeof page === 'number' && page - last > 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(page);
      if (typeof page === 'number') last = page;
    }

    return rangeWithDots;
  }

  goToPage(page: number | string) {
    if (page === '...' || page === this.currentPage) return;
    this.currentPage = +page;
    this.pageChange.emit(this.currentPage);
  }

  prevPage() {
    if (this.currentPage > 1) this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.goToPage(this.currentPage + 1);
  }
}
