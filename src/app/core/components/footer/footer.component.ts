import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <p>© 2025 Pokédex</p>
    </footer>
  `,
  styles: [`
    .footer {
      background: #c62828; /* Vermelho mais escuro */
      color: white;
      text-align: center;
      padding: 1rem 0;
      font-size: 0.9rem;
      margin-top: 2rem;
      box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class FooterComponent {}
