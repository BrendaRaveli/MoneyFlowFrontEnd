import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="home-page">
      <div class="hero-card">
        <p class="eyebrow">MoneyFlow</p>
        <h1>Visão geral da sua vida financeira</h1>
        <p class="hero-copy">
          Acompanhe seus gastos, organize categorias e mantenha o controle do seu orçamento em um só lugar.
        </p>
        <div class="hero-actions">
          <a class="primary-btn" routerLink="/transactions">Nova transação</a>
          <a class="secondary-btn" routerLink="/categories">Ver categorias</a>
        </div>
      </div>

      <div class="summary-grid">
        <article class="summary-card accent">
          <span class="summary-label">Saldo</span>
          <strong>R$ 4.280,00</strong>
          <p>+12% em relação ao mês passado</p>
        </article>
        <article class="summary-card">
          <span class="summary-label">Entradas</span>
          <strong>R$ 8.920,00</strong>
          <p>Receitas acumuladas</p>
        </article>
        <article class="summary-card">
          <span class="summary-label">Saídas</span>
          <strong>R$ 4.640,00</strong>
          <p>Despesas este mês</p>
        </article>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .home-page {
      display: grid;
      gap: 1.25rem;
    }

    .hero-card,
    .summary-card {
      background: rgba(9, 20, 33, 0.82);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.25rem;
      padding: 1.25rem;
      box-shadow: 0 16px 40px rgba(2, 8, 23, 0.28);
    }

    .hero-card {
      padding: 1.5rem;
      background: linear-gradient(135deg, rgba(44, 214, 144, 0.22), rgba(24, 119, 242, 0.16));
    }

    .eyebrow {
      margin: 0 0 0.35rem;
      text-transform: uppercase;
      letter-spacing: 0.24em;
      font-size: 0.72rem;
      color: #70e3b8;
      font-weight: 700;
    }

    h1 {
      margin: 0;
      font-size: clamp(1.5rem, 2.3vw, 2.15rem);
      line-height: 1.1;
    }

    .hero-copy {
      margin: 0.75rem 0 0;
      color: #a8b7cb;
      max-width: 42rem;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .primary-btn,
    .secondary-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      padding: 0.8rem 1rem;
      font-weight: 600;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .primary-btn {
      background: linear-gradient(135deg, #2ce1a6, #18a0c9);
      color: #03111b;
    }

    .secondary-btn {
      background: rgba(255, 255, 255, 0.06);
      color: #f4f7fb;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .primary-btn:hover,
    .secondary-btn:hover {
      transform: translateY(-1px);
      opacity: 0.95;
    }

    .summary-grid {
      display: grid;
      gap: 0.9rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .summary-label {
      display: block;
      color: #7f93ac;
      font-size: 0.8rem;
      margin-bottom: 0.3rem;
      text-transform: uppercase;
      letter-spacing: 0.18em;
    }

    .summary-card strong {
      display: block;
      font-size: 1.15rem;
      margin-bottom: 0.2rem;
    }

    .summary-card p {
      margin: 0;
      color: #8fa3ba;
      font-size: 0.92rem;
    }

    .summary-card.accent {
      background: linear-gradient(135deg, rgba(44, 214, 144, 0.18), rgba(9, 20, 33, 0.95));
    }

    @media (max-width: 680px) {
      .summary-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class HomeComponent {}
