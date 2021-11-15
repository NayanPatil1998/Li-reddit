import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return this.usersService.register(createUserDto, response, request);
  }

  @Post('/login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    console.log('Entered');
    return this.usersService.login(loginUserDto, response, request);
  }

  @Get('/users')
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/logout')
  logout(@Res() response: Response, @Req() request: Request) {
    return this.usersService.logout(response, request);
  }
}
