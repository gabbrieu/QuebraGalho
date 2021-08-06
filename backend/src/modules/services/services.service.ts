import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkerService } from '../accounts/worker/worker.service';
import { CreateServiceDto } from './dto/request/createService.dto';
import { Service } from './services.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly repository: Repository<Service>,
    private readonly workerService: WorkerService,
  ) {}

  async create(req: CreateServiceDto) {
    await this.workerService.getOne(req.workerId);
    // Verificar se o trabalhador tem status true
    return await this.repository.save({
      ...req,
      worker: {
        id: req.workerId,
      },
      status: true,
    });
  }
}
