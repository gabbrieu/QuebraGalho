import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { Accounts } from './accounts.entity';
import { CreateAccountsDto } from './dto/request/createAccounts.dto';
import { UpdateAccountsDto } from './dto/request/updateAccounts.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly repository: Repository<Accounts>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async getOne(id: string): Promise<Accounts> {
    const account = this.repository.findOne(id);
    if (!account) throw new NotFoundException('Conta não existe!');

    return await account;
  }

  async getByEmail(email: string): Promise<Accounts> {
    return await this.repository.findOne({ email }, { loadRelationIds: true });
  }

  async create(req: CreateAccountsDto): Promise<Accounts> {
    const hashPassword = await this.authService.encrypt(req.password);
    req.password = hashPassword;
    req.status = true;

    const savedAccounts = await this.repository.save(req);
    delete savedAccounts.password;

    return savedAccounts;
  }

  async update(id: string, req: UpdateAccountsDto): Promise<Accounts> {
    await this.getOne(id);
    await this.repository.update(id, { ...req });
    return await this.getOne(id);
  }
}
