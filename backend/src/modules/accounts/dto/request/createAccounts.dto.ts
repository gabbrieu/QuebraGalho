import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';
import { Accounts } from '../../accounts.entity';

export class CreateAccountsDto extends OmitType(Accounts, [
  'id',
  'updated_at',
  'created_at',
  'worker',
  'customer',
]) {
  @ApiPropertyOptional({
    description: 'Quais horários um trabalhador está disponível',
  })
  @IsString()
  available?: string;

  @ApiProperty({
    description: 'URL da foto do trabalhador',
  })
  @IsUrl()
  photo_url?: string;

  @ApiPropertyOptional({
    description: 'Link do LinkedIn do trabalhador',
  })
  @IsOptional()
  @IsUrl()
  linkedIn?: string;

  @IsOptional()
  @IsUUID()
  servicesId?: string;
  workerId?: string;
  customerId?: string;
}
