import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Accounts } from '../accounts/accounts.entity';
import { BaseAccounts } from '../accounts/baseAccounts.entity';

@Entity()
export class Customer extends BaseAccounts {
  @OneToOne(() => Accounts, (accounts) => accounts.customer)
  @JoinColumn()
  accounts: Accounts;

  @ApiProperty({
    description: 'URL da foto do trabalhador',
  })
  @Column({ nullable: true })
  @IsUrl()
  photoUrl: string;
}
