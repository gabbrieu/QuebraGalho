import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/request/createContract.dto';
import { CreateRatingsDto } from './dto/request/createRatings.dto';
import { GetAllContractFilterDto } from './dto/request/getAllContractFilter.dto';

@Controller('contract')
@ApiTags('Contract')
export class ContractController {
  constructor(private readonly service: ContractService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contratos retornados com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiOperation({ summary: 'Obtém todos os contratos' })
  async getAll(@Query() filters: GetAllContractFilterDto) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contrato por ID encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contrato não existe',
  })
  @ApiOperation({ summary: 'Obtém um contrato de serviço por ID' })
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.service.getOne(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Contrato criado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiOperation({ summary: 'Cria um novo contrato de serviço' })
  async create(@Body() req: CreateContractDto) {
    return await this.service.create(req);
  }

  @Patch('/ratings/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Avaliações criadas com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiOperation({ summary: 'Cria as avaliações' })
  async createRatings(@Param('id', new ParseUUIDPipe()) id: string, @Body() req: CreateRatingsDto) {
    return await this.service.createRatings(id, req);
  }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Atualiza um contrato de serviço' })
  // async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() req) {
  //   return await this.service.update(id, req);
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Contrato excluído com sucesso, porém sem retorno',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contrato não existe',
  })
  @ApiOperation({ summary: 'Deleta um contrato de serviço por ID' })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.service.delete(id);
  }
}
