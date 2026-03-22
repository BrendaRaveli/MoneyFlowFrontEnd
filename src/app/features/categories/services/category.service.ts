import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    { id: 1, name: 'Alimentação', type: 'expense' },
    { id: 2, name: 'Salário', type: 'income' }
  ];

  getAll(): Observable<Category[]> {
    return of(this.categories);
  }
}