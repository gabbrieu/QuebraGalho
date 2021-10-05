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
import { GetAllFilters } from '../accounts/worker/dto/request/getAllFilters.dto';
import { CreateServiceDto } from './dto/request/createService.dto';
import { Service } from './services.entity';
import { ServicesService } from './services.service';

@Controller('services')
@ApiTags('Services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Serviço criado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Trabalhador inativo',
  })
  @ApiOperation({ description: 'Cria um serviço' })
  async create(@Body() req: CreateServiceDto) {
    return await this.servicesService.create(req);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Serviços retornados com sucesso',
  })
  @ApiOperation({ description: 'Retorna vários serviços' })
  async getAll(@Query() filters: GetAllFilters) {
    return await this.servicesService.getAll(filters);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Serviços retornados com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serviço não existe',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiOperation({ description: 'Retorna um serviço por ID' })
  async getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Service> {
    return await this.servicesService.getOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Serviços excluídos com sucesso, porém sem retorno',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serviço não existe',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Serviço não existe',
  })
  @ApiOperation({ description: 'Inativa um serviço' })
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.servicesService.delete(id);
  }
}
