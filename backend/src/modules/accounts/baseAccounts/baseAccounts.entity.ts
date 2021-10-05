import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
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
  @Column()
  @IsNumberString()
  @MinLength(11)
  @MaxLength(14)
  document: string;

  @ApiPropertyOptional({ description: 'Data de nascimento da pessoa' })
  @Column({ nullable: true })
  @IsDateString()
  @IsOptional()
  birth_date?: string;

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

  @IsEmail()
  @Column()
  @ApiProperty({
    description: 'Email',
  })
  email: string;

  @ApiProperty({ description: 'Senha de uma pessoa' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Status da pessoa', readOnly: true })
  @Column()
  @IsBoolean()
  status: boolean;

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
