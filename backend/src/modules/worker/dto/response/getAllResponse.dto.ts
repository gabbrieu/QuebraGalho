import { PickType } from '@nestjs/swagger';
import { Worker } from '../../worker.entity';

export class GetAllWorkerResponseDto {
  data: GetAllData[];
  count: number;
}

export class GetAllData extends PickType(Worker, [
  'id',
  'fullName',
  'gender',
  'cellPhone',
  'status',
  'document',
  'description',
  'birthDate',
  'photoUrl',
  'linkedIn',
  'mainProfession',
  'cep',
  'address',
]) {}
