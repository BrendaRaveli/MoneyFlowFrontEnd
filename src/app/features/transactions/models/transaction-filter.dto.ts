import { TransactionType } from './transaction-type.enum';

export interface TransactionFilterDto {
  month?: number;
  year?: number;
  categoryId?: string;
  type?: TransactionType;
}
