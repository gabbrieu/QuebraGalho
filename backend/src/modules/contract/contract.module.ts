import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from '../costumer/customer.module';
import { ServicesModule } from '../services/services.module';
import { ContractController } from './contract.controller';
import { Contract } from './contract.entity';
import { ContractService } from './contract.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract]),
    CustomerModule,
    ServicesModule,
  ],
  providers: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
