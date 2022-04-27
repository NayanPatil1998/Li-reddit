import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import cors from 'cors';

import express  from "express"
import { COOKIE_NAME, __prod__ } from './utils/constants';
import User from './users/entities/user.entity';

const redisStore = connectRedis(session);
const redis = new Redis();
declare module 'express-session' {
  export interface SessionData {
    user: User;
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
  
      origin: 'http://localhost:4000',
      credentials: true,
      optionsSuccessStatus: 200,
    }),
  );

  app.use(express.static('public'))

  app.use(
    session({
      name: COOKIE_NAME,
      store: new redisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax', //CSEF
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
    }),
  );

  await app.listen(3000);

  console.log(`Server is running on ${await app.getUrl()}`);
}
bootstrap();
