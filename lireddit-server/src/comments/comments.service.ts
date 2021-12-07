import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import Post from 'src/posts/entities/post.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import Comment from './entities/comment.entity';

@Injectable()
export class CommentsService {
  async create(
    createCommentDto: CreateCommentDto,
    request: Request,
    response: Response,
  ) {
    const { body, slug, identifier } = createCommentDto;
    try {
      const post = await Post.findOneOrFail({
        slug,
        identifier,
      });

      const comment = Comment.create({
        body,
        post,
        user: request.session.user,
      });
      await comment.save();

      return response.status(200).json(comment);
    } catch (error) {
      console.log(error);
      return response.status(404).json({ error: 'post not found' });
    }
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
