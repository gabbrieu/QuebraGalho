import { PickType } from '@nestjs/swagger';
import { Customer } from '../../customer.entity';

export class UpdateCustomerDto extends PickType(Customer, [
  'fullName',
  'cellPhone',
  'address',
  'cep',
  'photoUrl',
]) {}
