import { CategoryType } from './category-type.enum';

export interface CategoryResponseDto {
  id: string; // Guid do .NET é mapeado como string no TS
  name: string;
  type: CategoryType;
}
