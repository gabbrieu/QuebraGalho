import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Gender {
  MASCULINO = 'masculino',
  FEMININO = 'feminino',
  NAO_INFORMADO = 'não informado',
}

export class BaseAccounts {
  @ApiProperty({ description: 'UUID de uma conta' })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'CPF/CNPJ',
    minLength: 11,
    maxLength: 14,
  })
  @Column({ unique: true })
  @IsNumberString()
  @MinLength(11)
  @MaxLength(14)
  document: string;

  @ApiPropertyOptional({ description: 'Data de nascimento da pessoa' })
  @Column({ nullable: true })
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({ description: 'Celular de uma pessoa' })
  @Column()
  @IsPhoneNumber('BR')
  cellPhone: string;

  @ApiProperty({ description: 'Nome da conta' })
  @Column()
  @IsString()
  fullName: string;

  @ApiPropertyOptional({
    enum: Gender,
    description: 'Gênero da pessoa',
  })
  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ description: 'Status da pessoa' })
  @Column()
  @IsBoolean()
  status: boolean;

  @Column()
  @ApiProperty({ description: 'CEP do endereço da pessoa' })
  @IsString()
  cep: string;

  @Column()
  @ApiProperty({ description: 'Endereço da pessoa' })
  @IsString()
  address: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    default: () => 'LOCALTIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
    default: () => 'LOCALTIMESTAMP',
  })
  updatedAt: string;
}
