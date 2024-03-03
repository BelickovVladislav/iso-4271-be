export interface ICountryItemResponse {
  id: string;
  isActive: boolean;
  name: string;
}

export interface ICurrencyItemResponse {
  id: string;
  name: string;
  code: string;
  countries: ICountryItemResponse[];
}
