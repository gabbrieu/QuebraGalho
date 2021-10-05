import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { GetAllFilters } from '../worker/dto/request/getAllFilters.dto';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/request/createCustomer.dto';
import { CreateCustomerResponseDto } from './dto/response/createCustomerResponse.dto';
import { GetAllCustomerResponseDto } from './dto/response/getAllCustomerResponse.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
    private readonly authService: AuthService,
  ) {}

  async create(req: CreateCustomerDto): Promise<CreateCustomerResponseDto> {
    if (await this.checkCpfAndEmail(req.document, req.email)) {
      throw new ConflictException('Cliente já existe');
    }
    const hashPassword = await this.authService.encrypt(req.password);
    req.password = hashPassword;
    req.status = true;

    const savedCustomer = await this.repository.save(req);
    delete savedCustomer.password;
    return savedCustomer as CreateCustomerResponseDto;
  }

  private async checkCpfAndEmail(
    document: string,
    email: string,
  ): Promise<boolean> {
    try {
      await this.repository.findOneOrFail({ document, status: true });
      await this.repository.findOneOrFail({ email, status: true });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getAll(filters: GetAllFilters): Promise<GetAllCustomerResponseDto> {
    let query = this.repository
      .createQueryBuilder('customer')
      .select('customer.id', 'id')
      .addSelect('customer.fullName', 'name')
      .addSelect('customer.gender', 'gender')
      .addSelect('customer.cellPhone', 'cellPhone')
      .addSelect('customer.email', 'email')
      .addSelect('customer.status', 'status')
      .addSelect('customer.document', 'document')
      .addSelect('customer.birth_date', 'birth_date')
      .take(filters.take)
      .skip(filters.skip);

    if (filters.status) {
      query.where('status = :status', { status: filters.status });
    } else {
      query.where('status = :status', { status: true });
    }

    if (filters.name) {
      query.andWhere(`"fullName" ILIKE :name`, { name: `%${filters.name}%` });
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
      const customer = await this.repository.findOneOrFail(id);
      delete customer.password;
      return customer;
    } catch (error) {
      throw new NotFoundException('Cliente não existe');
    }
  }

  //async update(id: string, req: UpdatecustomerDto): Promise<Customer> {}

  async delete(id: string): Promise<void> {
    const customer = await this.getOne(id);
    if (!customer.status) {
      throw new BadRequestException('Cliente já está inativo');
    }
    customer.status = false;
    await this.repository.save(customer);
  }
}
