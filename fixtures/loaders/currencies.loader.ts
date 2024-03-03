import { Type } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

import { CurrencyEntity } from '@entities/currency';
import { AbstractLoader, IRelationsOptions } from '@fixtures/abstract-loader';
import { EnvironmentType } from '@models/enums';

import { CURRENCIES } from '../data/currencies';

export class CurrenciesLoader extends AbstractLoader<CurrencyEntity> {
  get entity(): Type<CurrencyEntity> {
    return CurrencyEntity;
  }

  get data(): (Partial<CurrencyEntity> | DeepPartial<CurrencyEntity>)[] {
    return CURRENCIES;
  }

  get environments(): EnvironmentType[] {
    return [
      EnvironmentType.Production,
      EnvironmentType.Stage,
      EnvironmentType.Development,
    ];
  }

  get relations(): IRelationsOptions[] {
    return [];
  }
}
