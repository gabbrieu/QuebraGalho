import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBooleanString, IsOptional, Max, Min } from 'class-validator';

export class GetAllContractFilterDto {
  @ApiPropertyOptional({
    description: 'Quantidade de registros a serem obtidos',
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Max(50)
  @Min(0)
  take?: number;

  @ApiPropertyOptional({
    description: 'Quantidade de registros a serem ignorados',
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  skip?: number = 0;

  @ApiPropertyOptional({
    description: `Filtrar por status ('true' ou 'false'). Default = true`,
  })
  @IsBooleanString()
  status?: string = 'true';
}
