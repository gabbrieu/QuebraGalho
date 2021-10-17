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
import { CreateAccountsDto } from '../accounts/dto/request/createAccounts.dto';
import { GetAllFilters } from '../worker/dto/request/getAllFilters.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
    private readonly accountsService: AccountsService,
  ) {}

  async create(customerToCreate: CreateAccountsDto) {
    try {
      customerToCreate.type = TypeAccounts.CUSTOMER;
      const accountsToCreate = { ...customerToCreate };
      const account = await this.accountsService.create(accountsToCreate);

      const customer = this.repository.create({
        ...customerToCreate,
        accounts: { id: account.id },
      });

      return await this.repository.save(customer);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Erro! Cliente já existe no banco de dados',
        );
      }
    }
  }

  async getAll(filters: GetAllFilters) {
    let query = this.repository
      .createQueryBuilder('customer')
      .select('customer.id', 'id')
      .addSelect('accounts.id', 'accountsId')
      .addSelect('customer."fullName"', 'name')
      .addSelect('customer.gender', 'gender')
      .addSelect('customer."cellPhone"', 'cellPhone')
      .addSelect('accounts.email', 'email')
      .addSelect('customer.status', 'status')
      .addSelect('customer.cep', 'cep')
      .addSelect('customer.address', 'address')
      .addSelect('customer.document', 'document')
      .addSelect('customer."birthDate"', 'birthDate')
      .innerJoin('customer.accounts', 'accounts')
      .take(filters.take)
      .skip(filters.skip);

    if (filters.status) {
      query.where('customer.status = :status', { status: filters.status });
    } else {
      query.where('customer.status = :status', { status: true });
    }

    if (filters.name) {
      query.andWhere(`customer."fullName" ILIKE :name`, {
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

  async getOne(id: string): Promise<Customer> {
    try {
      const customer = await this.repository.findOneOrFail(id, {
        loadRelationIds: true,
      });
      return customer;
    } catch (error) {
      throw new NotFoundException('Erro! Cliente não existe');
    }
  }

  //async update(id: string, req: UpdatecustomerDto): Promise<Customer> {}

  async delete(id: string): Promise<void> {
    const customer = await this.getOne(id);
    if (!customer.status) {
      throw new BadRequestException('Erro! Cliente já está inativo');
    }
    customer.status = false;
    await this.repository.save(customer);
  }
}
