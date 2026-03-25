import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from './category.service';
import { Category } from './category';
import { BaseCategoryDto } from '../dtos/base-category.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryForm } from '../category-form/category-form';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoryForm],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  onSaveCategory(categoryData: BaseCategoryDto): void {
    if (this.selectedCategory) {
      const updateData: UpdateCategoryDto = {
        ...categoryData,
        id: this.selectedCategory.id
      };
      this.categoryService.update(updateData).subscribe(() => {
        this.selectedCategory = null;
      });
    } else {
      const createData: CreateCategoryDto = { ...categoryData };
      this.categoryService.create(createData).subscribe();
    }
  }

  onEditCategory(category: Category): void {
    this.selectedCategory = { ...category };
  }

  onCancelEdit(): void {
    this.selectedCategory = null;
  }

  onDeleteCategory(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoryService.delete(id).subscribe();
    }
  }
}
