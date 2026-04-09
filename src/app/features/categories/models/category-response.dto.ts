import { CategoryType } from './category-type.enum';

export interface CategoryResponseDto {
  id: string;
  name: string;
  type: CategoryType;
}
