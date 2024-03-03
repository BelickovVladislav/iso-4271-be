import { ApiProperty } from '@nestjs/swagger';

export class ApiUpdateCountry {
  @ApiProperty({ type: Boolean })
  isActive: boolean;
}
