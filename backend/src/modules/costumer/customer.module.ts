import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from '../accounts/accounts.module';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
@Module({
  imports: [TypeOrmModule.forFeature([Customer]), AccountsModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
