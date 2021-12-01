import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeAccounts } from '../accounts/accounts.entity';
import { AccountsService } from '../accounts/accounts.service';
import { CreateWorkerDto } from './dto/request/createWorker.dto';
import { GetAllFilters } from './dto/request/getAllFilters.dto';
import { UpdateWorkerDto } from './dto/request/updateWorker.dto';
import { GetAllWorkerResponseDto } from './dto/response/getAllResponse.dto';
import { Worker } from './worker.entity';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private readonly repository: Repository<Worker>,
    private readonly accountsService: AccountsService,
  ) {}

  async create(workerToCreate: CreateWorkerDto): Promise<Worker> {
    try {
      workerToCreate.type = TypeAccounts.WORKER;
      const accountsToCreate = { ...workerToCreate };
      const account = await this.accountsService.create(accountsToCreate);

      const worker = this.repository.create({
        accounts: { id: account.id },
        ...workerToCreate,
      });
      return await this.repository.save(worker);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Erro! Cliente já existe no banco de dados',
        );
      }
    }
  }

  async getAll(filters: GetAllFilters): Promise<GetAllWorkerResponseDto> {
    let query = this.repository
      .createQueryBuilder('worker')
      .select('worker.id', 'id')
      .addSelect('worker."fullName"', 'name')
      .addSelect('worker.gender', 'gender')
      .addSelect('worker.cellPhone', 'cellPhone')
      .addSelect('worker.status', 'status')
      .addSelect('worker.document', 'document')
      .addSelect('worker.description', 'description')
      .addSelect('worker."birthDate"', 'birthDate')
      .addSelect('worker.cep', 'cep')
      .addSelect('worker.address', 'address')
      .addSelect('worker."linkedIn"', 'linkedIn')
      .addSelect('worker."photoUrl"', 'photoUrl')
      .addSelect('worker."mainProfession"', 'mainProfession')
      .addSelect('accounts.email', 'email')
      .innerJoin('worker.accounts', 'accounts')
      .take(filters.take)
      .skip(filters.skip);

    if (filters.status) {
      query.where('worker.status = :status', { status: filters.status });
    } else {
      query.where('worker.status = :status', { status: true });
    }

    if (filters.name) {
      query.andWhere(`worker."fullName" ILIKE :name`, {
        name: `%${filters.name}%`,
      });
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

  async getOne(id: string): Promise<Worker> {
    try {
      const worker = await this.repository.findOneOrFail(id, {
        relations: ['services', 'accounts'],
      });
      delete worker.accounts.password;
      return worker;
    } catch (error) {
      throw new NotFoundException('Trabalhador não existe');
    }
  }

  async update(id: string, req: UpdateWorkerDto): Promise<Worker> {
    const worker = await this.getOne(id);
    await this.repository.update(id, { ...req });
    await this.accountsService.update(worker.accounts.id, {
      address: req.address,
      cellPhone: req.cellPhone,
      cep: req.cep,
      fullName: req.fullName,
    });
    return await this.repository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const worker = await this.getOne(id);
    if (!worker.status) {
      throw new BadRequestException('Trabalhador já está inativo');
    }
    worker.status = false;
    await this.repository.save(worker);
  }
}
