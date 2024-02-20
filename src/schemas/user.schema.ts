import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exchange } from '../entities/exchange.entity';
import { ObjectId } from 'mongodb';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  bankAccountNr: number;

  @Prop([Exchange])
  exchanges: Exchange[];
}

export const UserSchema = SchemaFactory.createForClass(User);
