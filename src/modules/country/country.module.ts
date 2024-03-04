import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryEntity } from '@db/entities/country';

import { COUNTRY_CONTROLLERS } from './controllers';
import { COUNTRY_SERVICES } from './services';

@Module({
  controllers: [...COUNTRY_CONTROLLERS],
  providers: [...COUNTRY_SERVICES],
  imports: [TypeOrmModule.forFeature([CountryEntity])],
})
export class CountryModule {}
