import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateSubredditDto } from './dto/create-subreddit.dto';
import { UpdateSubredditDto } from './dto/update-subreddit.dto';
import Subreddit from './entities/subreddit.entity';

@Injectable()
export class SubredditsService {
  async create(
    createSubredditDto: CreateSubredditDto,
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { title, name } = createSubredditDto;
    if (title.trim().length == 0) {
      return response.status(400).json({
        errors: [
          {
            field: 'title',
            message: 'Enter valid title',
          },
        ],
      });
    } else if (name.trim().length == 0) {
      return response.status(400).json({
        errors: [
          {
            field: 'name',
            message: 'Enter valid name',
          },
        ],
      });
    }

    const sub = await Subreddit.findOne({ name: name.toLowerCase() });

    if (sub) {
      return response.status(400).json({
        errors: [
          {
            field: 'name',
            message: `sub with name ${name} already exist`,
          },
        ],
      });
    }

    try {
      const newSub = Subreddit.create(createSubredditDto);

      newSub.user = request.session.user;

      await newSub.save();

      return response.status(200).json(newSub);
    } catch (error) {
      console.log(error);
      response.status(500).json({
        message: 'Something went wrong!',
      });
    }
  }

  findAll() {
    return `This action returns all subreddits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subreddit`;
  }

  update(id: number, updateSubredditDto: UpdateSubredditDto) {
    return `This action updates a #${id} subreddit`;
  }

  remove(id: number) {
    return `This action removes a #${id} subreddit`;
  }
}
