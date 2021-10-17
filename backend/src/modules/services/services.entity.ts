import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Worker } from '../worker/worker.entity';

@Entity()
export class Service {
  @ApiProperty({ description: 'UUID de uma conta' })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Nome do serviço' })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Status do serviço', readOnly: true })
  @Column()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ description: 'Descrição do serviço' })
  @Column()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Preço do serviço' })
  @Column({ type: 'numeric', precision: 12, scale: 2 })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Trabalhadores',
    type: 'string',
  })
  @IsUUID()
  @ManyToOne(() => Worker, (worker) => worker.services)
  worker: Worker;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    default: () => 'LOCALTIMESTAMP',
  })
  created_at: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
    default: () => 'LOCALTIMESTAMP',
  })
  updated_at: string;
}
