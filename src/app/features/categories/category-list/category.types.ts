export interface Category {
  id: number;
  name: string;
  type: string;
}

export interface BaseCategoryDto {
  name: string;
  type: string;
}

export interface CreateCategoryDto extends BaseCategoryDto {}

export interface UpdateCategoryDto extends BaseCategoryDto {
  id: number;
}
