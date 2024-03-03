import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CurrencyEntity } from '@entities/currency';

import { ApiGetAllCurrenciesResponseSwagger } from '../models';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly currencyRepository: Repository<CurrencyEntity>,
  ) {}

  getAll(): Promise<ApiGetAllCurrenciesResponseSwagger[]> {
    return this.currencyRepository.find({
      relations: ['countries'],
      order: { code: 'ASC', countries: { name: 'ASC' } },
    });
  }
}
