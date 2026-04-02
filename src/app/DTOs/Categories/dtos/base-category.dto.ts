import { CategoryType } from '../../enums/category-type.enum';

export interface BaseCategoryDto {
  name: string;
  type: CategoryType;
}
