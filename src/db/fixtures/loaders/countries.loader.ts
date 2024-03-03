import { Type } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

import { CountryEntity } from '@entities/country';
import { CurrencyEntity } from '@entities/currency';
import { EnvironmentType } from '@models/enums';

import { AbstractLoader, IRelationsOptions } from '../abstract-loader';
import { COUNTRIES } from '../data/countries';

export class CountriesLoader extends AbstractLoader<CountryEntity> {
  get entity(): Type<CountryEntity> {
    return CountryEntity;
  }

  get data(): (Partial<CountryEntity> | DeepPartial<CountryEntity>)[] {
    return COUNTRIES;
  }

  get environments(): EnvironmentType[] {
    return [
      EnvironmentType.Stage,
      EnvironmentType.Production,
      EnvironmentType.Development,
    ];
  }

  get relations(): IRelationsOptions<CurrencyEntity, CountryEntity>[] {
    return [
      {
        relationKey: 'currencies',
        relativeEntity: CurrencyEntity,
        strategy: 'partial',
      },
    ];
  }
}
