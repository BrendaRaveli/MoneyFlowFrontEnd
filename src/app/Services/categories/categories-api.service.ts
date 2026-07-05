import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryResponseDto } from '../../features/categories/models/category-response.dto';
import { CategoryDto } from '../../features/categories/models/category.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categories`;

  getAll(): Observable<CategoryResponseDto[]> {
    return this.http.get<CategoryResponseDto[]>(this.apiUrl);
  }

  getById(id: string): Observable<CategoryResponseDto> {
    return this.http.get<CategoryResponseDto>(`${this.apiUrl}/${id}`);
  }

  create(dto: CategoryDto): Observable<CategoryResponseDto> {
    return this.http.post<CategoryResponseDto>(this.apiUrl, dto);
  }

  update(id: string, dto: CategoryDto): Observable<CategoryResponseDto> {
    return this.http.put<CategoryResponseDto>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
