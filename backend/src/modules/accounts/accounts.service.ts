import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { Accounts } from './accounts.entity';
import { CreateAccountsDto } from './dto/request/createAccounts.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly repository: Repository<Accounts>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async getByEmail(email: string): Promise<Accounts> {
    return await this.repository.findOne({ email });
  }

  async create(req: CreateAccountsDto): Promise<Accounts> {
    const hashPassword = await this.authService.encrypt(req.password);
    req.password = hashPassword;
    req.status = true;

    const savedAccounts = await this.repository.save(req);
    delete savedAccounts.password;

    return savedAccounts;
  }
}
