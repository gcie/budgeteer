export class Transaction {
  id: string;
  amount: number;
  date: Date;
  mode: 'expense' | 'income';
  category: string;
  description: string;
}
