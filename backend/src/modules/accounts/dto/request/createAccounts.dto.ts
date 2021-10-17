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
  'birth_date',
  'cellPhone',
]) {
  @ApiProperty({ description: 'Status da pessoa', readOnly: true })
  @IsBoolean()
  status: boolean = true;
}
