import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../costumer/customer.entity';
import { Service } from '../services/services.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  @IsNumber()
  @ApiProperty({ description: 'Preço do serviço combinado' })
  price: number;

  @Column({ type: 'date' })
  @IsDateString()
  @ApiProperty({ description: 'Data de início do contrato' })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  @IsDateString()
  @ApiPropertyOptional({ description: 'Data de término do contrato' })
  endDate?: string;

  @Column({ type: 'text' })
  @IsString()
  @ApiProperty({ description: 'Descrição do serviço no contrato' })
  descriptionService: string;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Nota da avaliação do trabalhador' })
  @Min(1)
  @Max(5)
  ratingWorker?: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Texto descrevendo o porquê da nota do trabalhador',
  })
  textRatingWorker?: string;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Nota da avaliação do cliente' })
  @Min(1)
  @Max(5)
  ratingCustomer?: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Texto descrevendo o porquê da nota do cliente',
  })
  textRatingCustomer?: string;

  @Column()
  @IsBoolean()
  @ApiProperty({ description: 'Status do contrato' })
  status: boolean;

  @ManyToOne(() => Customer, (customer) => customer.contracts)
  customer: Customer;

  @ManyToOne(() => Service, (service) => service.contracts)
  service: Service;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    default: () => 'LOCALTIMESTAMP',
  })
  @ApiProperty({ description: 'Data de criação do registro' })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
    default: () => 'LOCALTIMESTAMP',
  })
  @ApiProperty({ description: 'Data de atualização do registro' })
  updatedAt: string;
}
