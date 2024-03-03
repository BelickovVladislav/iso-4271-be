import { ApiProperty } from '@nestjs/swagger';

export class ApiUpdateCountrySwagger {
  @ApiProperty({ type: Boolean })
  isActive: boolean;
}
