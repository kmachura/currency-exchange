import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyService } from './currency/currency.service';
import { CurrencyController } from './currency/currency.controller';
import { ExchangeService } from './users/exchange/exchange.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/currency'),
  ],
  controllers: [AppController, CurrencyController],
  providers: [
    AppService,
    CurrencyService,
    ExchangeService,
  ],
})
export class AppModule {}
