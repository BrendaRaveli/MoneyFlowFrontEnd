import { TransactionType } from './transaction-type.enum';

export interface TransactionResponseDto {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  notes?: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt?: string;
}
