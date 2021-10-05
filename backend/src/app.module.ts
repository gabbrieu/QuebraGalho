import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerModule } from './modules/costumer/customer.module';
import { ServicesModule } from './modules/services/services.module';
import { WorkerModule } from './modules/worker/worker.module';
import * as ormconfig from './ormconfig';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ormconfig,
    }),
    WorkerModule,
    CustomerModule,
    AuthModule,
    ServicesModule,
    AccountsModule,
  ],
})
export class AppModule {}
