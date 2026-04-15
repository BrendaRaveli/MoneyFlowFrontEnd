import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Transaction } from '../../features/transactions/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly initialTransactions: Transaction[] = [
    {
      id: 'tx-001',
      date: '2026-04-12',
      description: 'Salário mensal',
      category: 'Receita',
      account: 'Conta corrente',
      type: 'Receita',
      amount: 14500.0,
      status: 'Concluída',
      recurrence: 'Mensal'
    },
    {
      id: 'tx-002',
      date: '2026-04-14',
      description: 'Pagamento de boleto',
      category: 'Despesas fixas',
      account: 'Cartão crédito',
      type: 'Despesa',
      amount: -980.5,
      status: 'Concluída',
      recurrence: 'Única'
    },
    {
      id: 'tx-003',
      date: '2026-04-17',
      description: 'Aluguel',
      category: 'Moradia',
      account: 'Conta corrente',
      type: 'Despesa',
      amount: -2600.0,
      status: 'Pendente',
      recurrence: 'Mensal'
    },
    {
      id: 'tx-004',
      date: '2026-04-20',
      description: 'Recebimento freelance',
      category: 'Renda extra',
      account: 'Conta poupança',
      type: 'Receita',
      amount: 3200.0,
      status: 'Prevista',
      recurrence: 'Única'
    },
    {
      id: 'tx-005',
      date: '2026-04-21',
      description: 'Compra supermercado',
      category: 'Alimentação',
      account: 'Cartão débito',
      type: 'Despesa',
      amount: -520.75,
      status: 'Concluída',
      recurrence: 'Única'
    },
    {
      id: 'tx-006',
      date: '2026-04-23',
      description: 'Transferência interna',
      category: 'Transferência',
      account: 'Conta corrente',
      type: 'Transferência',
      amount: 0,
      status: 'Consolidada',
      recurrence: 'Única'
    }
  ];

  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private allTransactions: Transaction[] = [];

  constructor() {
    this.loadTransactions();
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  getLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  getError(): Observable<string | null> {
    return this.errorSubject.asObservable();
  }

  loadTransactions(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    of(this.initialTransactions)
      .pipe(
        delay(800),
        tap((transactions) => {
          this.allTransactions = transactions;
          this.transactionsSubject.next(transactions);
          this.loadingSubject.next(false);
        })
      )
      .subscribe();
  }

  refresh(): void {
    this.loadTransactions();
  }

  deleteTransaction(id: string): void {
    this.allTransactions = this.allTransactions.filter((tx) => tx.id !== id);
    this.transactionsSubject.next(this.allTransactions);
  }

  duplicateTransaction(transaction: Transaction): void {
    const duplicate: Transaction = {
      ...transaction,
      id: this.createId(),
      date: new Date().toISOString().slice(0, 10),
      status: 'Prevista'
    };
    this.allTransactions = [duplicate, ...this.allTransactions];
    this.transactionsSubject.next(this.allTransactions);
  }

  togglePaid(id: string): void {
    this.allTransactions = this.allTransactions.map((transaction) => {
      if (transaction.id !== id) {
        return transaction;
      }

      const nextStatus = transaction.status === 'Concluída' || transaction.status === 'Consolidada'
        ? 'Pendente'
        : 'Concluída';

      return {
        ...transaction,
        status: nextStatus
      };
    });

    this.transactionsSubject.next(this.allTransactions);
  }

  private createId(): string {
    return `tx-${Math.random().toString(36).slice(2, 9)}`;
  }
}
