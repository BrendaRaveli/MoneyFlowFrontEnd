import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/categories/category-list/category-list';

export const routes: Routes = [
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  }
];