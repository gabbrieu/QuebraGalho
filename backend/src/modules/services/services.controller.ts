import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from './dto/request/createService.dto';
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
  @ApiOperation({ description: 'Cria um serviço' })
  async create(@Body() req: CreateServiceDto) {
    this.servicesService.create(req);
  }
}
