import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryResponseDto } from '../../DTOs/Categories/dtos/category-response.dto';
import { CreateCategoryDto } from '../../DTOs/Categories/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../DTOs/Categories/dtos/update-category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:5001/api/categories'; // Ajuste conforme sua porta do backend

  getAll(): Observable<CategoryResponseDto[]> {
    return this.http.get<CategoryResponseDto[]>(this.apiUrl);
  }

  getById(id: string): Observable<CategoryResponseDto> {
    return this.http.get<CategoryResponseDto>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateCategoryDto): Observable<CategoryResponseDto> {
    return this.http.post<CategoryResponseDto>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateCategoryDto): Observable<CategoryResponseDto> {
    return this.http.put<CategoryResponseDto>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
