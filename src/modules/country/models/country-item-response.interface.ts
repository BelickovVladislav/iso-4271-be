export interface ICurrencyItemResponse {
  id: string;
  name: string;
  code: string;
}

export interface ICountryItemResponse {
  id: string;
  isActive: boolean;
  name: string;
  currencies: ICurrencyItemResponse[];
}
