import { Injectable, Logger } from '@nestjs/common';
import { ExchangedCurrencyDto } from '../dto/exchanged-currency.dto';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  async getExchangeRate(
    currencyShortcut: string,
  ): Promise<ExchangedCurrencyDto> {
    console.log(currencyShortcut);
    const link: string = '';
    const url = link.concat('http://api.nbp.pl/api/exchangerates/rates/A/',currencyShortcut,'/');

    try {
      const response = await axios.get<ExchangedCurrencyDto>(url);
      const currency = response.data;
      return currency as ExchangedCurrencyDto;
    } catch (error) {
      this.logger.error(`Failed to fetch exchange rate for
${currencyShortcut}: ${error.message}`);
      throw new Error(`Failed to fetch exchange rate for: ` + currencyShortcut);
    }
  }
}
