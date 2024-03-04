import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CurrencyEntity } from '@db/entities/currency';

import { ICurrencyItemResponse } from '../models';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly currencyRepository: Repository<CurrencyEntity>,
  ) {}

  getAll(): Promise<ICurrencyItemResponse[]> {
    return this.currencyRepository.find({
      relations: ['countries'],
      order: { code: 'ASC', countries: { name: 'ASC' } },
    });
  }
}
