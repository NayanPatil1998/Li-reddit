import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreatePostDto } from './dto/creat-post.dto';
import { PostsService } from './posts.service';
import { Request, Response } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  register(
    @Body() createPostDto: CreatePostDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return this.postsService.createPost(createPostDto, response, request);
  }
}
