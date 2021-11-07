import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/creat-post.dto';
import { Request, Response } from 'express';
import Post from './entities/post.entity';
import Subreddit from 'src/subreddits/entities/subreddit.entity';

@Injectable()
export class PostsService {
  async createPost(
    createPostDto: CreatePostDto,
    response: Response,
    request: Request,
  ): Promise<Response> {
    try {
      const sub = await Subreddit.findOneOrFail({
        name: createPostDto.subName.toLowerCase(),
      });

      const post = Post.create(createPostDto);

      post.sub = sub;

      post.user = request.session.user;

      await post.save();

      return response.status(200).json(post);
    } catch (error) {
      return response.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
}
