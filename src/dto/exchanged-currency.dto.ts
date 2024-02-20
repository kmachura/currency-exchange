import { RateDto } from './rate.dto';

export class ExchangedCurrencyDto {
  tableName: string;
  currency: string;
  code: string;
  rates: RateDto;
}
