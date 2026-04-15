export type TransactionType = 'Receita' | 'Despesa' | 'Transferência' | 'Cartão';
export type TransactionStatus = 'Concluída' | 'Pendente' | 'Prevista' | 'Consolidada';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  account: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  recurrence: string;
}

export interface TransactionFilter {
  search: string;
  period: string;
  type: string;
  account: string;
  category: string;
  status: string;
}
