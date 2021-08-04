import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseAccounts } from '../baseAccounts/baseAccounts.entity';

@Entity()
export class Worker extends BaseAccounts {
  @ApiPropertyOptional({
    description: 'Quais horários um trabalhador está disponível',
  })
  @Column({ nullable: true })
  available?: string;

  @ApiProperty()
  @Column()
  photo_url: string;
}
