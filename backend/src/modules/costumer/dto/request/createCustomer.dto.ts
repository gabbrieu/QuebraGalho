import { OmitType } from '@nestjs/swagger';
import { Customer } from '../../customer.entity';

export class CreateCustomerDto extends OmitType(Customer, [
  'created_at',
  'updated_at',
  'id',
]) {}
