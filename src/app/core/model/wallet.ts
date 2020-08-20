import { Transaction } from './transaction';

export class WalletMetadata {
  id: string;
  name: string;
}

export class Wallet {
  metadata: WalletMetadata;
  members: { [id: string]: 'owner' | 'member' };
  transactions: Transaction[];
}
