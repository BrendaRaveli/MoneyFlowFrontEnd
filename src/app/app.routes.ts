import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/categories/category-list/category-list';
import { TransactionListComponent } from './features/transactions/transaction-list/transaction-list';

export const routes: Routes = [
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'transacoes',
    component: TransactionListComponent
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  }
];