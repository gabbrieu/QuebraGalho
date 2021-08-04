import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class GetAllFilters {
  @ApiProperty({ description: 'Quantidade de registros a serem obtidos' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Max(50)
  @Min(0)
  take?: number = 10;

  @ApiProperty({ description: 'Quantidade de registros a serem ignorados' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  skip?: number = 0;

  @ApiProperty({
    description: 'Termo de busca para nome',
  })
  @IsOptional()
  name?: string;
}
