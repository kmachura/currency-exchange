import { Controller, Get, Param } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ExchangedCurrencyDto } from '../dto/exchanged-currency.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('rate')
  async getUSDExchangeRate(
    @Param('currencyShortcut') currencyShortcut: string,
  ): Promise<ExchangedCurrencyDto> {
    return await this.currencyService.getExchangeRate(currencyShortcut);
  }
}
