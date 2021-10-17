import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Accounts } from '../accounts/accounts.entity';
import { BaseAccounts } from '../accounts/baseAccounts.entity';

@Entity()
export class Customer extends BaseAccounts {
  @OneToOne(() => Accounts, (accounts) => accounts.customer)
  @JoinColumn()
  accounts: Accounts;
}
