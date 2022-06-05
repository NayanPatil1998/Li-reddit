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
import { Request, response, Response } from 'express';
import { request } from 'http';

@Controller('subreddits')
export class SubredditsController {
  constructor(private readonly subredditsService: SubredditsService) { }

  @Post('create')
  create(
    @Body() createSubredditDto: CreateSubredditDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return this.subredditsService.create(createSubredditDto, request, response);
  }

  @Get('/topsubs')
  findAll(@Res() response: Response,
    @Req() request: Request,) {
    return this.subredditsService.getTopSubs(request, response);
  }

  @Get(':name')
  findOne(@Param('name') name: string, @Req() request: Request, @Res() response: Response) {
    return this.subredditsService.findOne(name, request, response);
  }

  @Post(":name/image")
  uploadImage(@Param('name') name: string, @Req() request: Request, @Res() response: Response) {
    return this.subredditsService.uploadSubImage(request, response)
  }

  @Get('/search/:name')
  searchSubs(@Param('name') name: string,  @Req() request: Request, @Res() response: Response){
    return this.subredditsService.searchSubs(request, response, name)
  }
}
