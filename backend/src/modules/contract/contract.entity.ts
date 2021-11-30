import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
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
  @IsDate()
  @ApiProperty({ description: 'Data de início do contrato' })
  startDate: Date;

  @Column({ type: 'date' })
  @IsDate()
  @ApiProperty({ description: 'Data de término do contrato' })
  endDate: Date;

  @Column({ type: 'text' })
  @IsString()
  @ApiProperty({ description: 'Descrição do serviço no contrato' })
  descriptionService: string;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Nota da avaliação do trabalhador' })
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
