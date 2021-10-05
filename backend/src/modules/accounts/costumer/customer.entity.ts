import { Entity } from 'typeorm';
import { BaseAccounts } from '../baseAccounts/baseAccounts.entity';

@Entity()
export class Customer extends BaseAccounts {}
