import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header class="header">
      <div class="logo" routerLink="/">
        <img src="assets/images/pokeball.svg" alt="Pokédex" />
        <h1>Pokédex</h1>
      </div>
      <nav>
        <a routerLink="/" routerLinkActive="active" ariaCurrentWhenActive="page">Início</a>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: #e53935;
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }

    .logo img {
      width: 32px;
      height: 32px;
    }

    h1 {
      font-size: 1.4rem;
      font-weight: 600;
      margin: 0;
    }

    nav a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.2s;
    }

    nav a:hover {
      opacity: 0.8;
    }

    nav .active {
      text-decoration: underline;
    }
  `]
})
export class HeaderComponent {}
