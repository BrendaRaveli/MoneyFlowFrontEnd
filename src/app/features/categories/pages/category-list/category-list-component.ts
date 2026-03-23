import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { CategoryForm } from '../../components/category-form/category-form';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoryForm],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  onSaveCategory(category: Category): void {
    this.categoryService.create(category).subscribe();
  }

  onDeleteCategory(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoryService.delete(id).subscribe();
    }
  }
}
