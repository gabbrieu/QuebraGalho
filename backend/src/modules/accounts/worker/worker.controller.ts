import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateWorkerDto } from './dto/createWorker.dto';
import { GetAllFilters } from './dto/getAllFilters.dto';
import { Worker } from './worker.entity';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post('create')
  async create(@Body() req: CreateWorkerDto) {
    return this.workerService.create(req);
  }

  @Get()
  async getAll(@Query() filters: GetAllFilters) {
    return this.getAll(filters);
  }

  @Get(':id')
  async getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Worker> {
    return this.workerService.getOne(id);
  }

  /*
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() req: UpdateWorkerDto,
  ): Promise<Worker> {
    return this.workerService.update(id, req);
  }
  */

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.workerService.delete(id);
  }
}
