import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiCountryItemResponse,
  ApiUpdateCountry,
  CountryUpdateBodyDto,
  ICountryItemResponse,
} from '../models';
import { CountryService } from '../services';

@Controller('country')
@ApiTags('Country routes')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiResponse({ type: () => ApiCountryItemResponse, isArray: true })
  getAll(): Promise<ICountryItemResponse[]> {
    return this.countryService.getAll();
  }

  @Patch(':id')
  @ApiBody({ type: () => ApiUpdateCountry })
  @ApiParam({ name: 'id', type: String, description: 'UUID' })
  async updateCountry(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CountryUpdateBodyDto,
  ): Promise<void> {
    await this.countryService.updateCountry(id, dto);
  }
}
