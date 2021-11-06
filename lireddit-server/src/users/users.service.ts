import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async register(
    createUserDto: CreateUserDto,
    response: Response,
    request: Request,
  ): Promise<User | Response> {
    const user = User.create(createUserDto);
    const errors = await registerValidation(user);
    try {
      if (errors.length > 0) {
        return response.status(400).json({ errors });
      }
      // user.password = await hash(user.password);
      await user.save();
      return response.status(200).json({ user });
    } catch (error) {
      console.log(error);
      if (error.detail.includes('already exists'))
        if (error.detail.includes('(username)')) {
          return response.status(400).json({
            errors: [
              {
                field: 'username',
                message: `Username with ${user.username} is already exist`,
              },
            ],
          });
        } else {
          return response.status(400).json({
            errors: [
              {
                field: 'email',
                message: `Email with ${user.email} is already exist`,
              },
            ],
          });
        }
    }
  }

  async login(
    { emailOrUsername, password }: LoginUserDto,
    response: Response,
    request: Request,
  ): Promise<User | Response> {
    const user = await User.findOne(
      emailOrUsername.includes('@')
        ? { where: { email: emailOrUsername } }
        : {
            where: { username: emailOrUsername },
          },
    );
    if (!user) {
      return response.status(401).json({
        errors: [
          {
            field: 'emailOrUsername',
            message: `User with ${emailOrUsername} does not exist`,
          },
        ],
      });
    }
    const valid = await verify(user.password, password);
    if (!valid) {
      return response.status(401).json({
        errors: [
          {
            field: 'password',
            message: `Wrong password`,
          },
        ],
      });
    }

    return response.status(200).json({ user });
  }

  findAll(): Promise<User[]> {
    return User.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

const registerValidation = async (user: User) => {
  const errorList = [];
  const errors = await validate(user);
  errors.forEach((error) => {
    if (error.property === 'email') {
      errorList.push({
        field: error.property,
        message: error.constraints.isEmail,
      });
    } else if (error.property === 'username') {
      errorList.push({
        field: error.property,
        message: error.constraints.minLength,
      });
    } else if (error.property === 'password') {
      errorList.push({
        field: error.property,
        message: error.constraints.minLength,
      });
    }
  });

  return errorList;
};
