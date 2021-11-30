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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/request/createContract.dto';
import { GetAllContractFilterDto } from './dto/request/getAllContractFilter.dto';

@Controller('contract')
@ApiTags('Contract')
export class ContractController {
  constructor(private readonly service: ContractService) {}

  @Get()
  @ApiOperation({ summary: 'Obtém todos os contratos' })
  async getAll(filters: GetAllContractFilterDto) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um contrato de serviço por ID' })
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo contrato de serviço' })
  async create(@Body() req: CreateContractDto) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um contrato de serviço' })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() req) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um contrato de serviço por ID' })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {}
}
