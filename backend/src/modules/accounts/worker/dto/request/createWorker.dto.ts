import { OmitType } from '@nestjs/swagger';
import { Worker } from '../../worker.entity';

export class CreateWorkerDto extends OmitType(Worker, [
  'created_at',
  'updated_at',
  'id',
]) {}
