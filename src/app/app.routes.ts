import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/categories/category-list/category-list';
import { HomeComponent } from './features/home/home.component';
import { TransactionListComponent } from './features/transactions/transaction-list/transaction-list';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'transactions',
    component: TransactionListComponent,
  },
  {
    path: 'categories',
    component: CategoryListComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];