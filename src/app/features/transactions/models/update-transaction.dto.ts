export interface UpdateTransactionDto {
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  notes?: string;
}
