import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Accounts } from '../accounts/accounts.entity';
import { BaseAccounts } from '../accounts/baseAccounts.entity';
import { Service } from '../services/services.entity';

@Entity()
export class Worker extends BaseAccounts {
  @ApiPropertyOptional({
    description: 'Descrição geral do trabalhador, falar um pouco sobre ele',
  })
  @Column({ nullable: true, type: 'text' })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'URL da foto do trabalhador',
  })
  @Column()
  @IsUrl()
  photoUrl: string;

  @ApiPropertyOptional({
    description: 'Link do LinkedIn do trabalhador',
  })
  @Column({ nullable: true })
  @IsOptional()
  @IsUrl()
  linkedIn?: string;

  @ApiProperty({
    description: 'Profissão principal',
  })
  @Column()
  @IsString()
  mainProfession: string;

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
