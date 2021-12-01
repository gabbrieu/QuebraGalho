import { PickType } from '@nestjs/swagger';
import { Contract } from '../../contract.entity';

export class CreateRatingsDto extends PickType(Contract, [
  'textRatingCustomer',
  'textRatingWorker',
  'ratingCustomer',
  'ratingWorker',
]) {}
