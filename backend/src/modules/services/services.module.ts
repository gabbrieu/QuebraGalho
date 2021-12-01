import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerModule } from '../worker/worker.module';
import { ServicesController } from './services.controller';
import { Service } from './services.entity';
import { ServicesService } from './services.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), WorkerModule],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
