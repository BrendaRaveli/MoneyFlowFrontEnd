import { TransactionType } from './transaction-type.enum';

export interface CreateTransactionDto {
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  notes?: string;
}
