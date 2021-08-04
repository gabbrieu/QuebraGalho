import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseAccounts } from '../baseAccounts/baseAccounts.entity';

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
}
