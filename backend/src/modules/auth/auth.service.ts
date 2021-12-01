import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountsService } from '../accounts/accounts.service';
import { LoginRequestDto } from './dto/request/loginRequest.dto';
import { LoginResponseDto } from './dto/response/loginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
  ) {}

  async login(userLogin: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = userLogin;
    const user = await this.accountsService.getByEmail(email);
    if (!user)
      throw new UnauthorizedException('Não há registros desse email fornecido');

    if (!user.status) throw new BadRequestException('Usuário desativado');

    const decryptedPassword = await this.decrypt(user.password, password);
    delete user.password;

    if (decryptedPassword) {
      const payload = {
        email: user.email,
        id: user.id,
        name: user.fullName,
        type: user.type,
        workerId: user.worker,
        customerId: user.customer,
      };
      return {
        accessToken: this.jwtService.sign(payload),
        user,
      };
    }
    throw new UnauthorizedException('A senha fornecida não está correta');
  }

  async encrypt(valor: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(valor, salt);
  }

  async decrypt(hash: string, valor: string): Promise<boolean> {
    return await bcrypt.compare(valor, hash);
  }
}
