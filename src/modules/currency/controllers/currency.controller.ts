import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiCurrencyItemResponse, ICurrencyItemResponse } from '../models';
import { CurrencyService } from '../services';

@Controller('currency')
@ApiTags('Currency routes')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  @ApiResponse({
    type: () => ApiCurrencyItemResponse,
    isArray: true,
  })
  getAll(): Promise<ICurrencyItemResponse[]> {
    return this.currencyService.getAll();
  }
}
