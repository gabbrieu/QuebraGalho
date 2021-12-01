import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CustomerService } from '../costumer/customer.service';
import { ServicesService } from '../services/services.service';
import { Contract } from './contract.entity';
import { CreateContractDto } from './dto/request/createContract.dto';
import { CreateRatingsDto } from './dto/request/createRatings.dto';
import { GetAllContractFilterDto } from './dto/request/getAllContractFilter.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly repository: Repository<Contract>,
    private readonly customerService: CustomerService,
    private readonly serviceService: ServicesService,
  ) {}

  async getAll(filters: GetAllContractFilterDto) {
    const conditions: FindManyOptions<Contract> = {
      take: filters.take,
      skip: filters.skip,
      relations: ['service', 'service.worker', 'customer'],
    };

    if (filters.status) {
      conditions.where = { status: filters.status };
    } else {
      conditions.where = { status: true };
    }

    const [data, count] = await this.repository.findAndCount({ ...conditions });

    return {
      data,
      count,
    };
  }

  async getOne(id: string): Promise<Contract> {
    const contract = await this.repository.findOne(id, {
      relations: ['service', 'service.worker', 'customer'],
    });

    if (!contract)
      throw new NotFoundException(
        `Contrato com ID: '${id}' de serviço não encontrado`,
      );

    return contract;
  }

  async create(req: CreateContractDto) {
    const service = await this.serviceService.getOne(req.serviceId);
    if (!service.status)
      throw new BadRequestException('Serviço está desativado');

    const customer = await this.customerService.getOne(req.customerId);
    if (!customer.status)
      throw new BadRequestException('Cliente está desativado');

    return await this.repository.save({
      ...req,
      customer: {
        id: customer.id,
      },
      service: {
        id: service.id,
      },
      status: true,
    });
  }

  async createRatings(id: string, req: CreateRatingsDto) {
    await this.getOne(id);
    this.repository.update(id, { ...req });

    return await this.repository.findOne(id);
  }

  async delete(id: string) {
    const contract = await this.getOne(id);
    contract.status = false;

    await this.repository.save(contract);
  }
}
