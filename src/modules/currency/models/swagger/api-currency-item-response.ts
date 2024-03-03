import { ApiProperty } from '@nestjs/swagger';

import {
  ICountryItemResponse,
  ICurrencyItemResponse,
} from '../currency-item-response.interface';

export class ApiCountry implements ICountryItemResponse {
  @ApiProperty({ example: 'bfc7412e-2093-4b09-952d-42edc56e7776' })
  id: string;

  @ApiProperty({ type: Boolean, example: true })
  isActive: boolean;

  @ApiProperty({ example: 'America' })
  name: string;
}

export class ApiCurrencyItemResponse implements ICurrencyItemResponse {
  @ApiProperty({ example: 'bfc7412e-2093-4b09-952d-42edc56e7776' })
  id: string;

  @ApiProperty({ example: 'American Dollar' })
  name: string;

  @ApiProperty({ example: 'USD' })
  code: string;

  @ApiProperty({ type: () => ApiCountry, isArray: true })
  countries: ApiCountry[];
}
