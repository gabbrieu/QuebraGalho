import { PickType } from '@nestjs/swagger';
import { Service } from '../../services.entity';

export class UpdateServiceDto extends PickType(Service, [
  'name',
  'description',
  'price',
]) {}
