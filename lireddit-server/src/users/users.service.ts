import { Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import Comment from 'src/comments/entities/comment.entity';
import Post from 'src/posts/entities/post.entity';
import { COOKIE_NAME } from 'src/utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
  async register(
    createUserDto: CreateUserDto,
    response: Response,
    request: Request,
  ): Promise<User | Response> {
    const user = User.create(createUserDto);
    const errors = await registerValidation(user);
    try {
      if (errors.length > 0) {
        return response.json({ errors });
      }
      // user.password = await hash(user.password);
      await user.save();
      request.session.user = user;
      return response.status(200).json({ user });
    } catch (error) {
      console.log(error);
      if (error.detail.includes('already exists'))
        if (error.detail.includes('(username)')) {
          return response.json({
            errors: [
              {
                field: 'username',
                message: `Username with ${user.username} is already exist`,
              },
            ],
          });
        } else {
          return response.json({
            errors: [
              {
                field: 'email',
                message: `Email with ${user.email} is already exist`,
              },
            ],
          });
        }
    }
  }

  async login(
    { emailOrUsername, password }: LoginUserDto,
    response: Response,
    request: Request,
  ): Promise<User | Response> {
    const user = await User.findOne(
      emailOrUsername.includes('@')
        ? { where: { email: emailOrUsername } }
        : {
            where: { username: emailOrUsername },
          },
    );
    if (!user) {
      return response.json({
        errors: [
          {
            field: 'emailOrUsername',
            message: `User with ${emailOrUsername} does not exist`,
          },
        ],
      });
    }
    const valid = await verify(user.password, password);
    if (!valid) {
      return response.json({
        errors: [
          {
            field: 'password',
            message: `Wrong password`,
          },
        ],
      });
    }
    request.session.user = user;

    return response.status(200).json({ user });
  }

  async logout(response: Response, request: Request) {
    const isDone = new Promise((resolve) =>
      request.session.destroy((err: any) => {
        response.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);

          resolve(false);
          return response.status(401).json({
            message: 'unauthenticated',
          });
        }
        resolve(true);
      }),
    );
    if (await isDone)
      return response.status(200).json({
        message: 'succes',
      });
  }

  findAll(): Promise<User[]> {
    return User.find();
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  me(request: Request, response: Response): Response {
    const user: User | undefined = request.session.user;
    return response.json(user);
  }

  async getUserSubmissions(
    request: Request,
    response: Response,
    username: string,
  ): Promise<Response> {
    try {
      const user = await User.findOneOrFail({
        where: { username: username },
      });

      const posts = await Post.find({
        where: { user },
        relations: ['comments', 'votes', 'sub'],
        order: { createdAt: 'DESC' },
      });

      const comments = await Comment.find({
        where: { user },
        relations: ['post'],
        order: { createdAt: 'DESC' },
      });

      if (request.session.user) {
        posts.forEach((p) => p.setUserVote(request.session.user));
        comments.forEach((c) => c.setUserVote(request.session.user));
      }

      let submissions: any = {};

      submissions.posts = posts;
      submissions.comments = comments;

      return response.status(200).json({ user, submissions });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: 'something went wrong' });
    }
  }
}

const registerValidation = async (user: User) => {
  const errorList = [];
  const errors = await validate(user);
  errors.forEach((error) => {
    if (error.property === 'email') {
      errorList.push({
        field: error.property,
        message: error.constraints.isEmail,
      });
    } else if (error.property === 'username') {
      errorList.push({
        field: error.property,
        message: error.constraints.minLength,
      });
    } else if (error.property === 'password') {
      errorList.push({
        field: error.property,
        message: error.constraints.minLength,
      });
    }
  });

  return errorList;
};
