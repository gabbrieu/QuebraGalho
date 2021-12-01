import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ description: 'Email para login' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha para login' })
  @IsString()
  password: string;
}
