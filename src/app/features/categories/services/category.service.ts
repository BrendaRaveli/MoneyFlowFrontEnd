import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    { id: 1, name: 'Alimentação', type: 'expense' },
    { id: 2, name: 'Salário', type: 'income' }
  ];

  // Usando BehaviorSubject para tornar a lista reativa
  private categoriesSubject = new BehaviorSubject<Category[]>(this.categories);

  getAll(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  create(category: Category): Observable<Category> {
    this.categories = [...this.categories, category];
    this.categoriesSubject.next(this.categories);
    return of(category);
  }

  delete(id: number): Observable<void> {
    this.categories = this.categories.filter(c => c.id !== id);
    this.categoriesSubject.next(this.categories);
    return of(undefined);
  }
}
