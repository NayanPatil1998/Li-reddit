import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  todos: string[] = [];

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('gettodo')
  getTodo(): string[] {
    return this.todos;
  }

  @Post('createtodo')
  postTodo(@Body() todo: any, @Res() res): Response {
    this.todos.push(todo);
    return res.json(todo);
  }
}
