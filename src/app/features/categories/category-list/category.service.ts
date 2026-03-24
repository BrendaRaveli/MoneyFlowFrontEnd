import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category, CreateCategoryDto, UpdateCategoryDto } from './category.types';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    { id: 1, name: 'Alimentação', type: 'expense' },
    { id: 2, name: 'Salário', type: 'income' }
  ];

  private categoriesSubject = new BehaviorSubject<Category[]>(this.categories);

  getAll(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  create(category: CreateCategoryDto): Observable<Category> {
    const newCategory: Category = {
      ...category,
      id: Math.floor(Math.random() * 1000)
    };
    this.categories = [...this.categories, newCategory];
    this.categoriesSubject.next(this.categories);
    return of(newCategory);
  }

  delete(id: number): Observable<void> {
    this.categories = this.categories.filter(c => c.id !== id);
    this.categoriesSubject.next(this.categories);
    return of(undefined);
  }

  update(updatedCategory: UpdateCategoryDto): Observable<Category> {
    this.categories = this.categories.map(c => 
      c.id === updatedCategory.id ? { ...updatedCategory } : c
    );
    this.categoriesSubject.next(this.categories);
    return of(updatedCategory as Category);
  }
}
