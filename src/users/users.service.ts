import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateExchangeDto } from '../dto/create-exchange.dto';
import { Exchange } from '../entities/exchange.entity';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return (await createdUser.save()).toObject();
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException('This email id is already in use');
      }

      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async makeExchange(
    id: string,
    createExchangeDto: CreateExchangeDto,
  ): Promise<UserDocument> {
    const updateUserDto = new UpdateUserDto();
    const exchangeModel = new Model<Exchange>();
    updateUserDto.exchange = new exchangeModel(createExchangeDto);
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
