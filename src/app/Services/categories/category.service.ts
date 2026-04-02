import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CategoryResponseDto } from '../../DTOs/Categories/dtos/category-response.dto';
import { CreateCategoryDto } from '../../DTOs/Categories/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../DTOs/Categories/dtos/update-category.dto';
import { CategoriesApiService } from './categories-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private api = inject(CategoriesApiService);
  
  private categories: CategoryResponseDto[] = [];
  private categoriesSubject = new BehaviorSubject<CategoryResponseDto[]>([]);

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.api.getAll().subscribe(data => {
      this.categories = data;
      this.categoriesSubject.next(this.categories);
    });
  }

  getAll(): Observable<CategoryResponseDto[]> {
    return this.categoriesSubject.asObservable();
  }

  create(dto: CreateCategoryDto): Observable<CategoryResponseDto> {
    return this.api.create(dto).pipe(
      tap(newCategory => {
        this.categories = [...this.categories, newCategory];
        this.categoriesSubject.next(this.categories);
      })
    );
  }

  update(id: string, dto: UpdateCategoryDto): Observable<CategoryResponseDto> {
    return this.api.update(id, dto).pipe(
      tap(updatedCategory => {
        this.categories = this.categories.map(c => 
          c.id === id ? updatedCategory : c
        );
        this.categoriesSubject.next(this.categories);
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.api.delete(id).pipe(
      tap(() => {
        this.categories = this.categories.filter(c => c.id !== id);
        this.categoriesSubject.next(this.categories);
      })
    );
  }
}
