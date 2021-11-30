import { PickType } from '@nestjs/swagger';
import { Contract } from '../../contract.entity';

export class CreateContractDto extends PickType(Contract, [
  'price',
  'ratingCustomer',
  'ratingWorker',
  'startDate',
  'endDate',
  'descriptionService',
  'textRatingWorker',
  'textRatingCustomer',
]) {}
