import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllFilters } from '../worker/dto/request/getAllFilters.dto';
import { WorkerService } from '../worker/worker.service';
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
    const worker = await this.workerService.getOne(req.workerId);
    if (!worker.status) {
      throw new BadRequestException('Trabalhador está inativo');
    }

    return await this.repository.save({
      ...req,
      worker: {
        id: req.workerId,
      },
      status: true,
    });
  }

  async getAll(filters: GetAllFilters) {
    let query = this.repository
      .createQueryBuilder('service')
      .select('service.id', 'id')
      .addSelect('service.name', 'name')
      .addSelect('service.status', 'status')
      .addSelect('service.description', 'description')
      .addSelect('service.price', 'price')
      .addSelect('service.workerId', 'workerId')
      .take(filters.take)
      .skip(filters.skip);

    if (filters.status) {
      query.where('status = :status', { status: filters.status });
    } else {
      query.where('status = :status', { status: true });
    }

    if (filters.name) {
      query.andWhere(`name ILIKE :name`, { name: `%${filters.name}%` });
    }

    const [data, count] = await Promise.all([
      query.clone().getRawMany(),
      query.clone().getCount(),
    ]);

    return {
      data,
      count,
    };
  }

  /**async getOne(id: string): Promise<Service> {
    try {
      const service = await this.repository.findOneOrFail(id, {
        relations: ['worker'],
      });
      delete service.worker.password;

      return service;
    } catch (error) {
      throw new NotFoundException('Serviço não encontrado');
    }
  }

  async delete(id: string): Promise<void> {
    const service = await this.getOne(id);
    if (service.status) service.status = false;
    else throw new BadRequestException('Serviço inativo');

    await this.repository.save(service);
  }**/
}
