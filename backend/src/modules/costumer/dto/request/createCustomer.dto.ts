import { OmitType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Customer } from '../../customer.entity';

export class CreateCustomerDto extends OmitType(Customer, [
  'created_at',
  'updated_at',
  'id',
  'accounts',
]) {
  @IsUUID()
  accountsId: string;
}
