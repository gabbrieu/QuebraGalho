import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from './accounts.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly repository: Repository<Accounts>,
  ) {}

  async getByEmail(email: string): Promise<Accounts> {
    return await this.repository.findOne({ email });
  }

  async create(): Promise<Accounts> {}
}
