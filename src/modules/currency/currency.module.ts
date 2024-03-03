import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CurrencyEntity } from '@entities/currency';

import { CURRENCY_CONTROLLERS } from './controllers';
import { CURRENCY_SERVICES } from './services';

@Module({
  controllers: [...CURRENCY_CONTROLLERS],
  providers: [...CURRENCY_SERVICES],
  imports: [TypeOrmModule.forFeature([CurrencyEntity])],
})
export class CurrencyModule {}
