import { Transaction } from './transaction';

export class Wallet {
  id: string; // wallet id
  name: string;
  members: { [id: string]: 'owner' | 'member' }[];
  transactions: Transaction[];
}
