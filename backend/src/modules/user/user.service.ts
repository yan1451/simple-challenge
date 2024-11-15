import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(createUserDto: CreateUserDto): Promise<string> {
    try {
      const existingUser = await this.userModel.findOne({
        email: createUserDto.email,
      });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      createUserDto.password = await this.hashPassword(createUserDto.password);
      const newUser = new this.userModel(createUserDto);
      newUser.save();
      return newUser.name;
    } catch (e) {
      throw new ConflictException({
        message: e.message,
      });
    }
  }

  async hashPassword(password: string): Promise<string> {
    const hash = await argon2.hash(password);
    return hash;
  }
}
