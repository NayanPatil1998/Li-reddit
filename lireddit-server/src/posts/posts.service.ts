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

  async fetchPosts(response: Response): Promise<Response> {
    try {
      const posts = await Post.find({
        order: {
          createdAt: 'DESC',
        },
      });
      return response.status(200).json(posts);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }

  async fetchPost(response: Response, slug: string, identifier: string) {
    try {
      const post = await Post.findOneOrFail(
        { slug, identifier },
        { relations: ['sub', 'comments'] },
      );
      return response.status(200).json(post);
    } catch (error) {
      console.log(error);
      return response.status(404).json({ error: 'post not found' });
    }
  }
}
