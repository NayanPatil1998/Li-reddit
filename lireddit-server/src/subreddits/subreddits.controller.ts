import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { SubredditsService } from './subreddits.service';
import { CreateSubredditDto } from './dto/create-subreddit.dto';
import { UpdateSubredditDto } from './dto/update-subreddit.dto';
import { Request, Response } from 'express';

@Controller('subreddits')
export class SubredditsController {
  constructor(private readonly subredditsService: SubredditsService) {}

  @Post('create')
  create(
    @Body() createSubredditDto: CreateSubredditDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return this.subredditsService.create(createSubredditDto, request, response);
  }

  @Get()
  findAll() {
    return this.subredditsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subredditsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubredditDto: UpdateSubredditDto,
  ) {
    return this.subredditsService.update(+id, updateSubredditDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subredditsService.remove(+id);
  }
}
