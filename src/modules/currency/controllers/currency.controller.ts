import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiGetAllCurrenciesResponseSwagger } from '../models';
import { CurrencyService } from '../services';

@Controller('currency')
@ApiTags('Currency routes')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  @ApiResponse({
    type: () => ApiGetAllCurrenciesResponseSwagger,
    isArray: true,
  })
  getAll(): Promise<ApiGetAllCurrenciesResponseSwagger[]> {
    return this.currencyService.getAll();
  }
}
