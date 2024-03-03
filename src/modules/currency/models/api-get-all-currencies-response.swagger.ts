import { ApiProperty } from '@nestjs/swagger';

export class ApiCountry {
  @ApiProperty({ example: 'bfc7412e-2093-4b09-952d-42edc56e7776' })
  id: string;

  @ApiProperty({ type: Boolean, example: true })
  isActive: boolean;

  @ApiProperty({ example: 'America' })
  name: string;
}

export class ApiGetAllCurrenciesResponseSwagger {
  @ApiProperty({ example: 'bfc7412e-2093-4b09-952d-42edc56e7776' })
  id: string;

  @ApiProperty({ example: 'American Dollar' })
  name: string;

  @ApiProperty({ example: 'USD' })
  code: string;

  @ApiProperty({ type: () => ApiCountry, isArray: true })
  countries: ApiCountry[];
}
