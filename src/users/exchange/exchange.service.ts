import { Injectable, Logger } from '@nestjs/common';
import { CurrencyService } from '../../currency/currency.service';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class ExchangeService {
  private readonly logger = new Logger(ExchangeService.name);

  constructor(private readonly currencyService: CurrencyService) {}

  async performExchange(
    user: UpdateUserDto,
    toCurrencyShortcut: string,
    amountToChange: number,
  ) {
    const rate = this.currencyService.getExchangeRate(toCurrencyShortcut);
    const exchangedAmount: number = 123;
    user.exchange.exchangeAmount = exchangedAmount;
    user.exchange.amountToExchange = amountToChange;
    user.exchange.rate = Number((await rate).rates.mid);
    user.exchange.dateAndTime = new Date();
    return user;
  }
}
