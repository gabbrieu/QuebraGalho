import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './modules/accounts/costumer/customer.module';
import { WorkerModule } from './modules/accounts/worker/worker.module';
import { AuthModule } from './modules/auth/auth.module';
import * as ormconfig from './ormconfig';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ormconfig,
    }),
    WorkerModule,
    CustomerModule,
    AuthModule,
  ],
})
export class AppModule {}
