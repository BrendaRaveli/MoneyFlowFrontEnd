import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction, TransactionFilter, TransactionStatus, TransactionType } from '../transaction.model';
import { TransactionService } from '../../../Services/transactions/transaction.service';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  loading = true;
  errorMessage: string | null = null;
  periodOptions = ['Abril 2026', 'Março 2026', 'Fevereiro 2026'];
  typeOptions: TransactionType[] = ['Receita', 'Despesa', 'Transferência', 'Cartão'];
  accountOptions = ['Conta corrente', 'Conta poupança', 'Cartão crédito', 'Cartão débito'];
  categoryOptions = ['Receita', 'Despesas fixas', 'Moradia', 'Renda extra', 'Alimentação', 'Transferência'];
  statusOptions: TransactionStatus[] = ['Concluída', 'Pendente', 'Prevista', 'Consolidada'];

  filter: TransactionFilter = {
    search: '',
    period: 'Abril 2026',
    type: '',
    account: '',
    category: '',
    status: ''
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getLoading().subscribe((value) => (this.loading = value));
    this.transactionService.getError().subscribe((message) => (this.errorMessage = message));
    this.transactionService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
      this.applyFilters();
    });
  }

  get summary() {
    const visible = this.filteredTransactions.length > 0 ? this.filteredTransactions : this.transactions;
    const income = visible.filter((tx) => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);
    const expense = visible.filter((tx) => tx.amount < 0).reduce((sum, tx) => sum + tx.amount, 0);
    const periodBalance = income + expense;
    const pending = visible.filter((tx) => tx.status === 'Pendente' || tx.status === 'Prevista').length;

    return {
      income,
      expense,
      periodBalance,
      pending
    };
  }

  get hasTransactions(): boolean {
    return this.filteredTransactions.length > 0;
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  applyFilters(): void {
    this.filteredTransactions = this.transactions.filter((transaction) => {
      const searchLower = this.filter.search.toLowerCase();
      const matchesText =
        transaction.description.toLowerCase().includes(searchLower) ||
        transaction.category.toLowerCase().includes(searchLower) ||
        transaction.account.toLowerCase().includes(searchLower);

      const matchesType = this.filter.type ? transaction.type === this.filter.type : true;
      const matchesAccount = this.filter.account ? transaction.account === this.filter.account : true;
      const matchesCategory = this.filter.category ? transaction.category === this.filter.category : true;
      const matchesStatus = this.filter.status ? transaction.status === this.filter.status : true;
      const matchesPeriod = this.filter.period ? transaction.date.includes(this.filter.period.slice(0, 3).toLowerCase()) || this.filter.period === 'Abril 2026' : true;

      return matchesText && matchesType && matchesAccount && matchesCategory && matchesStatus && matchesPeriod;
    });
  }

  clearFilters(): void {
    this.filter = {
      search: '',
      period: 'Abril 2026',
      type: '',
      account: '',
      category: '',
      status: ''
    };
    this.applyFilters();
  }

  onRetry(): void {
    this.transactionService.refresh();
  }

  onDuplicate(transaction: Transaction): void {
    this.transactionService.duplicateTransaction(transaction);
  }

  onDelete(transaction: Transaction): void {
    if (confirm('Excluir esta transação?')) {
      this.transactionService.deleteTransaction(transaction.id);
    }
  }

  onTogglePaid(transaction: Transaction): void {
    this.transactionService.togglePaid(transaction.id);
  }

  onEdit(transaction: Transaction): void {
    alert(`Editar transação: ${transaction.description}`);
  }

  getCurrencyClass(amount: number): string {
    return amount >= 0 ? 'badge positive' : 'badge negative';
  }

  getStatusClass(status: TransactionStatus): string {
    switch (status) {
      case 'Concluída':
      case 'Consolidada':
        return 'badge status-complete';
      case 'Pendente':
        return 'badge status-warning';
      case 'Prevista':
        return 'badge status-pending';
      default:
        return 'badge';
    }
  }

  getFormattedAmount(amount: number): string {
    return this.formatCurrency(amount);
  }
}
