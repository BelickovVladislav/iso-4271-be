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
  ApiResponseGetAllCountriesSwagger,
  ApiUpdateCountrySwagger,
  UpdateCountryDto,
} from '../models';
import { CountryService } from '../services';

@Controller('country')
@ApiTags('Country routes')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiResponse({ type: () => ApiResponseGetAllCountriesSwagger, isArray: true })
  getAll(): Promise<ApiResponseGetAllCountriesSwagger[]> {
    return this.countryService.getAll();
  }

  @Patch(':id')
  @ApiBody({ type: () => ApiUpdateCountrySwagger })
  @ApiParam({ name: 'id', type: String, description: 'UUID' })
  async updateCountry(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCountryDto,
  ) {
    await this.countryService.updateCountry(id, dto);
  }
}
