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

  async getCommentsByPost(request: Request, response: Response) {
    const { identifier, slug } = request.params

    try {
      const post = await Post.findOneOrFail({ identifier, slug })

      const comments = await Comment.find({ where: { post }, order: { createdAt: "DESC" }, relations: ['votes'] })

      if (request.session.user) {
        comments.forEach((p) => p.setUserVote(request.session.user));
      }

      response.json(comments)

    } catch (error) {
      console.log(error)
      response.status(500).json({error: error.message})
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
