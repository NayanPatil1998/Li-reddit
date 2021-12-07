import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { CreatePostDto } from './dto/creat-post.dto';
import { PostsService } from './posts.service';
import { request, Request, Response } from 'express';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('post/create')
  register(
    @Body() createPostDto: CreatePostDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return this.postsService.createPost(createPostDto, response, request);
  }

  @Get('posts')
  getPosts(@Res() response: Response, @Req() request: Request) {
    return this.postsService.fetchPosts(response, request);
  }

  @Get('/post/:identifier/:slug')
  getPost(@Param() params, @Res() response: Response) {
    const { identifier, slug } = params;
    // console.log(identifier, slug);
    return this.postsService.fetchPost(response, slug, identifier);
  }
}
