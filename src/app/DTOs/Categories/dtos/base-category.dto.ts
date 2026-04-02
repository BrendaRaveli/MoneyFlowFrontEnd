import { CategoryType } from './category-type.enum';

export interface BaseCategoryDto {
  name: string;
  type: CategoryType;
}
