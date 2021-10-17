import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateWorkerDto } from './dto/request/createWorker.dto';
import { GetAllFilters } from './dto/request/getAllFilters.dto';
import { GetAllWorkerResponseDto } from './dto/response/getAllResponse.dto';
import { Worker } from './worker.entity';
import { WorkerService } from './worker.service';

@Controller('worker')
@ApiTags('Worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Trabalhador criado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Trabalhador já existe',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiOperation({ summary: 'Endpoint de criação do trabalhador' })
  async create(@Body() req: CreateWorkerDto) {
    return await this.workerService.create(req);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Trabalhadores retornados com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiOperation({ summary: 'Endpoint de retorno de trabalhadores' })
  async getAll(
    @Query() filters: GetAllFilters,
  ): Promise<GetAllWorkerResponseDto> {
    return await this.workerService.getAll(filters);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Trabalhador retornado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Trabalhador não existe',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiOperation({ summary: 'Endpoint de retorno de um trabalhador por ID' })
  async getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Worker> {
    return await this.workerService.getOne(id);
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Trabalhador removido com sucesso, porém sem retorno',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Trabalhador não existe',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiOperation({ summary: 'Endpoint de exclusão de um trabalhador' })
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.workerService.delete(id);
  }
}
