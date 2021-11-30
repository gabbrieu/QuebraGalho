import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { GetAllFilters } from '../worker/dto/request/getAllFilters.dto';
import { WorkerService } from '../worker/worker.service';
import { CreateServiceDto } from './dto/request/createService.dto';
import { UpdateServiceDto } from './dto/request/updateService.dto';
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

  async getAll(
    filters: GetAllFilters,
  ): Promise<{ data: Service[]; count: number }> {
    const conditions: FindManyOptions<Service> = {
      take: filters.take,
      skip: filters.skip,
    };

    if (filters.name) {
      conditions.where = { name: ILike(`%${filters.name}%`) };
    }

    if (filters.status) {
      conditions.where = {
        status: filters.status,
        ...(conditions.where as object),
      };
    } else {
      conditions.where = { status: true, ...(conditions.where as object) };
    }

    const [data, count] = await this.repository.findAndCount({
      ...conditions,
      relations: ['worker'],
    });

    console.log(conditions);

    return {
      data,
      count,
    };
  }

  async getOne(id: string): Promise<Service> {
    try {
      const service = await this.repository.findOneOrFail(id);

      return service;
    } catch (error) {
      throw new NotFoundException('Serviço não encontrado');
    }
  }

  async update(id: string, req: UpdateServiceDto): Promise<Service> {
    let service = await this.getOne(id);
    service.description = req.description;
    service.name = req.name;
    service.price = req.price;

    return await this.repository.save(service);
  }

  async delete(id: string): Promise<void> {
    const service = await this.getOne(id);
    if (service.status) service.status = false;
    else throw new BadRequestException('Serviço inativo');

    await this.repository.save(service);
  }
}
