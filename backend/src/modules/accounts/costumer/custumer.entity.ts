import { Entity } from 'typeorm';
import { BaseAccounts } from '../baseAccounts/baseAccounts.entity';

@Entity()
export class Custumer extends BaseAccounts {}
