import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';
import { Accounts } from '../../../accounts/accounts.entity';

export class CreateWorkerDto extends PickType(Accounts, [
  'fullName',
  'email',
  'password',
  'gender',
  'cellPhone',
  'type',
  'birthDate',
  'cep',
  'address',
  'document',
]) {
  @ApiPropertyOptional({
    description: 'Link do LinkedIn do trabalhador',
  })
  @IsOptional()
  @IsUrl()
  linkedIn?: string;

  @ApiPropertyOptional({
    description: 'Descrição geral do trabalhador, falar um pouco sobre ele',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'URL da foto do trabalhador',
  })
  @IsUrl()
  photoUrl: string;

  @ApiProperty({ description: 'Status da pessoa' })
  @IsBoolean()
  status: boolean = true;

  @ApiProperty({
    description: 'Profissão principal',
  })
  @IsString()
  mainProfession: string;
}
