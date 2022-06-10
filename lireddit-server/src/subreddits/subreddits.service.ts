import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import s from 'connect-redis';
import { Request, Response } from 'express';
import fs from 'fs';
import { getConnection, getRepository } from 'typeorm';
import Post from './../posts/entities/post.entity';
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
    const { title, name, description } = createSubredditDto;
    if (title.trim().length == 0) {
      return response.json({
        errors: [
          {
            field: 'title',
            message: 'Enter valid title',
          },
        ],
      });
    } else if (name.trim().length == 0) {
      return response.json({
        errors: [
          {
            field: 'name',
            message: 'Enter valid name',
          },
        ],
      });
    }

    const sub = await Subreddit.findOne({ name: name.trim().toLowerCase() });

    if (sub) {
      return response.json({
        errors: [
          {
            field: 'name',
            message: `sub with name ${name} already exist`,
          },
        ],
      });
    }

    try {
      const newSub = Subreddit.create({name: name.trim().toLowerCase(), description, title  });

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

  async getTopSubs (request: Request, response: Response): Promise<Response>{
    try {
      const imageUrlExp = `COALESCE('http://localhost:3000/images/' || s."imageUrn" , 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y')`
    const subs = await getConnection()
      .createQueryBuilder()
      .select(
        `s.title, s.name, ${imageUrlExp} as "imageUrl", count(p.id) as "postCount"`
      )
      .from(Subreddit, 's')
      .leftJoin(Post, 'p', `s.name = p."subName"`)
      .groupBy('s.title, s.name, "imageUrl"')
      .orderBy(`"postCount"`, 'DESC')
      .limit(5)
      .execute()

      return response.json(subs)
    } catch (error) {
      return response.status(500).json({error : error})
      
    }
  }

  async findOne(name: string, request: Request, response: Response): Promise<Response> {
    try {
      const sub = await Subreddit.findOneOrFail({ name })
      const posts = await Post.find({
        where: { sub }, order: {
          createdAt: 'DESC',
        }, relations: ['comments', 'votes']
      })

      sub.posts = posts

      if (request.session.user) {
        sub.posts.forEach((post) => {
          post.setUserVote(request.session.user)
        })
      }

      return response.status(200).json(sub)

    } catch (err) {
      // console.error(err)
      return response.status(404).json({
        message: 'Something went wrong!',
      });
    }
  }

  async uploadSubImage(req: Request, res: Response) {
    const sub: Subreddit = res.locals.sub
    try {
      const type = req.body.type
      console.log(req.file)

      if (type !== 'image' && type !== 'banner') {
        fs.unlinkSync(req.file.path)
        return res.status(400).json({ error: 'Invalid type' })
      }

      let oldImageUrn: string = ''
      if (type === 'image') {
        oldImageUrn = sub.imageUrn ?? ''
        sub.imageUrn = req.file.filename
      } else if (type === 'banner') {
        oldImageUrn = sub.bannerUrn ?? ''
        sub.bannerUrn = req.file.filename
      }
      await sub.save()

      if (oldImageUrn !== '') {
        fs.unlinkSync(`public/images/${oldImageUrn}`)
      }

      return res.json(sub)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }


  async searchSubs (req: Request, res: Response, name: string) : Promise<Response> {

    try {
      if(isEmpty(name)){
        return res.status(400).json({message: "Name must not be empty"})
      }
  
      const subs = await getRepository(Subreddit)
      .createQueryBuilder().where('LOWER(name) LIKE :name', {name: `${name.toLowerCase().trim()}%`})
      .getMany()
  
      return res.status(200).json(subs)
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: "Something went wrong"})
    }

  }


}


