import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Customer } from '../costumer/customer.entity';
import { Worker } from '../worker/worker.entity';
import { BaseAccounts } from './baseAccounts.entity';

export enum TypeAccounts {
  worker = 'WORKER',
  customer = 'CUSTOMER',
}

@Entity()
export class Accounts extends BaseAccounts {
  @IsEmail()
  @Column({ unique: true })
  @ApiProperty({
    description: 'Email',
  })
  email: string;

  @ApiProperty({ description: 'Senha da conta de uma pessoa' })
  @Column()
  password: string;

  @ApiProperty({ enum: TypeAccounts, enumName: 'TypeAccounts' })
  @Column({ type: 'enum', enum: TypeAccounts })
  type: TypeAccounts;

  @OneToOne(() => Worker, (worker) => worker.accounts)
  @JoinColumn()
  worker: Worker;

  @OneToOne(() => Customer, (customer) => customer.accounts)
  @JoinColumn()
  customer: Customer;
}
