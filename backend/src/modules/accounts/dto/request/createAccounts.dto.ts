import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { Accounts } from '../../accounts.entity';

export class CreateAccountsDto extends PickType(Accounts, [
  'fullName',
  'document',
  'email',
  'password',
  'type',
  'gender',
  'birthDate',
  'cellPhone',
  'cep',
  'address',
]) {
  @ApiProperty({ description: 'Status da pessoa' })
  @IsBoolean()
  status: boolean = true;
}
