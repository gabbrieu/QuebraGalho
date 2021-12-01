import { PickType } from '@nestjs/swagger';
import { Accounts } from '../../accounts.entity';

export class UpdateAccountsDto extends PickType(Accounts, [
  'fullName',
  'cep',
  'address',
  'cellPhone',
]) {}
