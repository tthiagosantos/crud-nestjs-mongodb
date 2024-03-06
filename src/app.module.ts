import { Module } from '@nestjs/common';
import { CompanyModule } from './app/company/company.module';
import { DatabaseModule } from './infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';

@Module({
  imports: [ConfigModule.forRoot(), CompanyModule, DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiKeyInterceptor,
    },
  ],
})
export class AppModule {}
