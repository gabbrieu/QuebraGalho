import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Service } from '../../services.entity';

export class CreateServiceDto extends PickType(Service, [
  'name',
  'description',
  'price',
]) {
  @ApiProperty({ description: 'Id do Trabalhador' })
  @IsUUID()
  workerId: string;
}
