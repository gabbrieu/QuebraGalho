import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Contract } from '../../contract.entity';

export class CreateContractDto extends PickType(Contract, [
  'price',
  'startDate',
  'endDate',
  'descriptionService',
]) {
  @IsUUID()
  @ApiProperty({ description: 'Id de um serviço' })
  serviceId: string;

  @IsUUID()
  @ApiProperty({ description: 'Id de um cliente' })
  customerId: string;
}
