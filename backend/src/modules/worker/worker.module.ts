import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from '../accounts/accounts.module';
import { WorkerController } from './worker.controller';
import { Worker } from './worker.entity';
import { WorkerService } from './worker.service';

@Module({
  imports: [TypeOrmModule.forFeature([Worker]), AccountsModule],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
