import { PickType } from '@nestjs/swagger';
import { Worker } from '../../worker.entity';

export class CreateWorkerResponseDto extends PickType(Worker, [
  'id',
  'fullName',
  'document',
  'status',
  'birth_date',
  'gender',
  'available',
  'cellPhone',
  'linkedIn',
  'photo_url',
  'created_at',
  'updated_at',
]) {}
