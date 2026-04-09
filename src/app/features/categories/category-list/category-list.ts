import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../Services/categories/category.service';
import { CategoryResponseDto } from '../models/category-response.dto';
import { CategoryDto } from '../models/category.dto';
import { CategoryForm } from '../category-form/category-form';
import { CategoryType } from '../models/category-type.enum';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoryForm],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryListComponent implements OnInit {
  categories: CategoryResponseDto[] = [];
  selectedCategory: CategoryResponseDto | null = null;
  CategoryType = CategoryType; // Permite usar o enum no template

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  onSaveCategory(categoryData: CategoryDto): void {
    if (this.selectedCategory) {
      this.categoryService.update(this.selectedCategory.id, categoryData).subscribe(() => {
        this.selectedCategory = null;
      });
    } else {
      this.categoryService.create(categoryData).subscribe();
    }
  }

  onEditCategory(category: CategoryResponseDto): void {
    this.selectedCategory = { ...category };
  }

  onCancelEdit(): void {
    this.selectedCategory = null;
  }

  onDeleteCategory(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoryService.delete(id).subscribe();
    }
  }
}
