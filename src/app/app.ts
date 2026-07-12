import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('MoneyFlow');

  protected readonly navItems = [
    { label: 'Home', icon: '⌂', path: '/home' },
    { label: 'Transações', icon: '⇄', path: '/transactions' },
    { label: 'Categorias', icon: '◫', path: '/categories' },
  ];
}
