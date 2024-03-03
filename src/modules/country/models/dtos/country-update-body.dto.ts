import { IsBoolean } from 'class-validator';

import { ICountryUpdateBody } from '../country-update-body.interface';

export class CountryUpdateBodyDto implements ICountryUpdateBody {
  @IsBoolean()
  isActive: boolean;
}
