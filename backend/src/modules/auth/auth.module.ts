import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthService } from './auth.service';
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
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
