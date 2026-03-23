import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/categories/pages/category-list/category-list-component';

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