import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkerDto } from './dto/createWorker.dto';
import { GetAllFilters } from './dto/getAllFilters.dto';
import { Worker } from './worker.entity';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker) private repository: Repository<Worker>,
  ) {}

  async create(req: CreateWorkerDto) {}

  async getAll(filters: GetAllFilters) {
    let query = this.repository
      .createQueryBuilder('worker')
      .select('worker.*')
      .addSelect('worker.fullName', 'name')
      .addSelect('worker.gender', 'gender')
      .addSelect('worker.cellPhone', 'cellPhone')
      .addSelect('worker.email', 'email')
      .addSelect('worker.status', 'status')
      .addSelect('worker.document', 'document')
      .addSelect('worker.available', 'available');
  }

  async getOne(id: string): Promise<Worker> {
    try {
      return this.repository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException('Trabalhador não existe');
    }
  }

  //async update(id: string, req: UpdateWorkerDto): Promise<Worker> {}

  async delete(id: string): Promise<void> {}
}
