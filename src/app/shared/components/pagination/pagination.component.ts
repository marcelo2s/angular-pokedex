import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pagination',
  imports: [NgIf, NgFor],
  template: `
    <nav class="pagination" *ngIf="totalPages > 1">
      <button (click)="prevPage()" [disabled]="currentPage === 1" aria-label="Anterior">←</button>

      <ng-container *ngFor="let item of visiblePages">
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
      animation: fadeIn 0.3s ease; /* 🔹 animação de entrada suave */
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
      transition: 
        background 0.25s ease,
        transform 0.15s ease,
        opacity 0.2s ease;
      flex-shrink: 0;
    }

    button:hover:not(:disabled) {
      background: #c62828;
      transform: translateY(-1px);
    }

    button:active:not(:disabled) {
      transform: translateY(1px);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .active {
      background: #b71c1c;
      font-weight: 700;
      transform: scale(1.05);
    }

    .dots {
      color: #b71c1c;
      font-weight: bold;
      padding: 0 0.5rem;
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
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

  get visiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    const leftBoundary = 3;
    const rightBoundary = total - 2;
    const showLeftDots = current > leftBoundary + 2;
    const showRightDots = current < rightBoundary - 1;

    for (let i = 1; i <= 3; i++) pages.push(i);

    if (showLeftDots) pages.push('...');

    const start = Math.max(current - 1, 4);
    const end = Math.min(current + 1, total - 3);

    for (let i = start; i <= end; i++) {
      if (i > 3 && i < total - 2) pages.push(i);
    }

    if (showRightDots) pages.push('...');

    for (let i = total - 2; i <= total; i++) {
      pages.push(i);
    }

    return Array.from(new Set(pages)).sort((a, b) =>
      a === '...' ? 1 : b === '...' ? -1 : (a as number) - (b as number)
    );
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
