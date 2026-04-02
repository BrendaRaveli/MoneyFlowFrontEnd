import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../Services/categories/category.service';
import { CategoryResponseDto } from '../../../DTOs/Categories/dtos/category-response.dto';
import { BaseCategoryDto } from '../../../DTOs/Categories/dtos/base-category.dto';
import { CreateCategoryDto } from '../../../DTOs/Categories/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../../DTOs/Categories/dtos/update-category.dto';
import { CategoryForm } from '../category-form/category-form';
import { CategoryType } from '../../../DTOs/enums/category-type.enum';

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

  onSaveCategory(categoryData: BaseCategoryDto): void {
    if (this.selectedCategory) {
      const updateData: UpdateCategoryDto = { ...categoryData };
      this.categoryService.update(this.selectedCategory.id, updateData).subscribe(() => {
        this.selectedCategory = null;
      });
    } else {
      const createData: CreateCategoryDto = { ...categoryData };
      this.categoryService.create(createData).subscribe();
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
