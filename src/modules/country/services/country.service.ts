import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CountryEntity } from '@entities/country';

import { ApiResponseGetAllCountriesSwagger, UpdateCountryDto } from '../models';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  getAll(): Promise<ApiResponseGetAllCountriesSwagger[]> {
    return this.countryRepository.find({
      relations: ['currencies'],
      order: { name: 'ASC', currencies: { name: 'ASC' } },
    });
  }

  updateCountry(id: string, dto: UpdateCountryDto) {
    return this.countryRepository.update(id, dto);
  }
}
