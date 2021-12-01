import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Accounts } from './accounts.entity';
import { AccountsService } from './accounts.service';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Conta retornado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cliente não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro em algum dos campos',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiOperation({ summary: 'Endpoint para retornar uma conta por ID' })
  async getOne(@Param('id') id: string): Promise<Accounts> {
    return await this.service.getOne(id);
  }

  @Get('email/:email')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Conta retornado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cliente não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro em algum dos campos',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro',
  })
  @ApiOperation({ summary: 'Endpoint para retornar uma conta por email' })
  async getByEmail(@Param('email') email: string): Promise<Accounts> {
    return await this.service.getByEmail(email);
  }
}
