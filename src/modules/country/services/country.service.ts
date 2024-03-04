import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CountryEntity } from '@db/entities/country';

import { ICountryItemResponse, ICountryUpdateBody } from '../models';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  getAll(): Promise<ICountryItemResponse[]> {
    return this.countryRepository.find({
      relations: ['currencies'],
      order: { name: 'ASC', currencies: { name: 'ASC' } },
    });
  }

  async updateCountry(id: string, dto: ICountryUpdateBody): Promise<void> {
    await this.countryRepository.update(id, dto);
  }
}
