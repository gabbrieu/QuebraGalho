import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
dotenv.config();
@Module({
  imports: [
    forwardRef(() => AccountsModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_TOKEN,
      signOptions: { expiresIn: '5h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
