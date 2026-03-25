import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../category-list/category';
import { BaseCategoryDto } from '../dtos/base-category.dto';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm implements OnChanges {
  @Input() categoryToEdit: Category | null = null;
  @Output() save = new EventEmitter<BaseCategoryDto>();
  @Output() cancel = new EventEmitter<void>();
  
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['expense', [Validators.required]]
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
        ...this.categoryForm.value
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
    this.categoryForm.reset({ type: 'expense' });
  }
}
