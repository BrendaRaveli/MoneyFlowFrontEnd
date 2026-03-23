import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm {
  @Output() save = new EventEmitter<Category>();
  
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['expense', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const newCategory: Category = {
        id: Math.floor(Math.random() * 1000), // ID temporário enquanto em memória
        ...this.categoryForm.value
      };
      
      this.save.emit(newCategory);
      this.categoryForm.reset({ type: 'expense' });
    }
  }
}
