import { CategoryType } from '../../enums/category-type.enum';

export interface CategoryResponseDto {
  id: string;
  name: string;
  type: CategoryType;
}
