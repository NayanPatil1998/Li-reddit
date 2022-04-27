import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import Comment from 'src/comments/entities/comment.entity';
import Post from 'src/posts/entities/post.entity';
import User from 'src/users/entities/user.entity';
import { VoteDTO } from './dto/vote.dto';
import Vote from './entities/vote.entity';

@Injectable()
export class VotesService {
  async vote(voteDto: VoteDTO, req: Request, res: Response) {
    const { slug, identifier, commentIdentifier, value } = voteDto;

    if (![-1, 0, 1].includes(value)) {
      res.status(400).json({ value: 'Value must be -1, 0 or 1' });
    }

    try {
      const user: User = req.session.user;
      let post: Post | undefined;
      let vote: Vote | undefined;
      let comment: Comment | undefined;

      if (commentIdentifier) {
        comment = await Comment.findOneOrFail({
          where: { identifier: commentIdentifier },
        });
        vote = await Vote.findOne({ where: { user, comment } });
        // console.log(vote)
      } else {
        post = await Post.findOneOrFail({ where: { identifier, slug } });
        vote = await Vote.findOne({ where: { user, post } });
      }

      if (!vote && value === 0) {
        // if no vote and value = 0 return error
        return res.status(404).json({ error: 'Vote not found' });
      } else if (!vote) {
        // If no vote create it
        vote = Vote.create({ user, value });
        if (comment) vote.comment = comment;
        else vote.post = post;
        await vote.save();
      } else if (value === 0) {
        // If vote exists and value = 0 remove vote from DB
        await vote.remove();
      } else if (vote.value !== value) {
        // If vote and value has changed, update vote
        vote.value = value;
        await vote.save();
      }
      post = await Post.findOneOrFail(
        { identifier, slug },
        { relations: ['comments', 'comments.votes', 'sub', 'votes'] },
      );
      post.setUserVote(user);
      post.comments.forEach((c) => c.setUserVote(user));

      return res.json(post);
    } catch (err) {
      console.log(err.message)
      return res.status(500).json({error : err.message});

    }
  }
}
