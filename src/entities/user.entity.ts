import { Exchange } from './exchange.entity';
import { ObjectId } from 'mongodb';

export class User {
  _id: ObjectId;
  name: string;
  surname: string;
  password: string;
  email: string;
  bankAccountNr: number;
  exchange: Exchange;
}
