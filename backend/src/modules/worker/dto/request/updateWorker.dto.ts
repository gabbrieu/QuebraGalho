import { PickType } from '@nestjs/swagger';
import { Worker } from '../../worker.entity';

export class UpdateWorkerDto extends PickType(Worker, [
  'fullName',
  'cellPhone',
  'address',
  'cep',
  'linkedIn',
  'mainProfession',
  'description',
]) {}
