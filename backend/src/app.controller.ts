import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './modules/auth/auth.service';
import { LoginRequestDto } from './modules/auth/dto/request/loginRequest.dto';
import { LoginResponseDto } from './modules/auth/dto/response/loginResponse.dto';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @ApiCreatedResponse({ description: 'Usuário logado' })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas' })
  @ApiOperation({ summary: 'Faz o login do usuário' })
  async login(@Body() req: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(req);
  }

  @Get('auth/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Payload retornado' })
  @ApiUnauthorizedResponse({ description: 'Token inválido' })
  @ApiOperation({ summary: 'Obtem o payload de login (JWT) atual' })
  getProfile(@Req() req) {
    return req.user;
  }
}
