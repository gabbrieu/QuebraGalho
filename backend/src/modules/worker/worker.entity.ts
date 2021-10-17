import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Accounts } from '../accounts/accounts.entity';
import { BaseAccounts } from '../accounts/baseAccounts.entity';
import { Service } from '../services/services.entity';

@Entity()
export class Worker extends BaseAccounts {
  @ApiPropertyOptional({
    description: 'Quais horários um trabalhador está disponível',
  })
  @Column({ nullable: true })
  @IsString()
  available?: string;

  @ApiProperty({
    description: 'URL da foto do trabalhador',
  })
  @Column()
  @IsUrl()
  photo_url: string;

  @ApiPropertyOptional({
    description: 'Link do LinkedIn do trabalhador',
  })
  @Column({ nullable: true })
  @IsOptional()
  @IsUrl()
  linkedIn?: string;

  @ApiProperty({
    type: () => Service,
    description: 'Serviços',
    isArray: true,
  })
  @IsUUID(undefined, { each: true })
  @OneToMany(() => Service, (service) => service.worker)
  services: Service[];

  @OneToOne(() => Accounts, (accounts) => accounts.worker)
  @JoinColumn()
  accounts: Accounts;
}
