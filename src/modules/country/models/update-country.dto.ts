import { IsBoolean } from 'class-validator';

export class UpdateCountryDto {
  @IsBoolean()
  isActive: boolean;
}
