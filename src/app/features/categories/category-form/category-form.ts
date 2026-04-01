import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryResponseDto } from '../dtos/category-response.dto';
import { BaseCategoryDto } from '../dtos/base-category.dto';
import { CategoryType } from '../dtos/category-type.enum';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm implements OnChanges {
  @Input() categoryToEdit: CategoryResponseDto | null = null;
  @Output() save = new EventEmitter<BaseCategoryDto>();
  @Output() cancel = new EventEmitter<void>();
  
  categoryForm: FormGroup;
  CategoryType = CategoryType;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: [CategoryType.Expense, [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryToEdit'] && this.categoryToEdit) {
      this.categoryForm.patchValue({
        name: this.categoryToEdit.name,
        type: this.categoryToEdit.type
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData: BaseCategoryDto = {
        name: this.categoryForm.value.name,
        type: Number(this.categoryForm.value.type) // Garante que seja número para o enum
      };
      
      this.save.emit(categoryData);
      this.resetForm();
    }
  }

  onCancel(): void {
    this.resetForm();
    this.cancel.emit();
  }

  private resetForm(): void {
    this.categoryForm.reset({ type: CategoryType.Expense });
  }
}
