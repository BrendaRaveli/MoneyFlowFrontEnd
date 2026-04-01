import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CategoryResponseDto } from '../dtos/category-response.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryType } from '../dtos/category-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // Simulação de banco de dados com Guid (strings)
  private categories: CategoryResponseDto[] = [
    { id: '11111111-1111-1111-1111-111111111111', name: 'Alimentação', type: CategoryType.Expense },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Salário', type: CategoryType.Income }
  ];

  private categoriesSubject = new BehaviorSubject<CategoryResponseDto[]>(this.categories);

  getAll(): Observable<CategoryResponseDto[]> {
    return this.categoriesSubject.asObservable();
  }

  getById(id: string): Observable<CategoryResponseDto | undefined> {
    const category = this.categories.find(c => c.id === id);
    return of(category);
  }

  create(category: CreateCategoryDto): Observable<CategoryResponseDto> {
    // Em uma integração real, o HttpClient.post retornaria o objeto com o ID gerado pelo banco
    const newCategory: CategoryResponseDto = {
      ...category,
      id: 'id-gerado-pelo-backend' // Apenas para simulação visual no mock
    };
    this.categories = [...this.categories, newCategory];
    this.categoriesSubject.next(this.categories);
    return of(newCategory);
  }

  // PUT /api/categories/{id}
  // No PUT do REST, o ID vai na URL e o DTO (corpo) não precisa conter o ID
  update(id: string, category: UpdateCategoryDto): Observable<CategoryResponseDto> {
    this.categories = this.categories.map(c => 
      c.id === id ? { ...category, id } : c
    );
    this.categoriesSubject.next(this.categories);
    const updated = this.categories.find(c => c.id === id)!;
    return of(updated);
  }

  // DELETE /api/categories/{id}
  delete(id: string): Observable<void> {
    this.categories = this.categories.filter(c => c.id !== id);
    this.categoriesSubject.next(this.categories);
    return of(undefined);
  }
}
