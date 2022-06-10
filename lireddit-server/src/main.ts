import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import cors from 'cors';

import express from 'express';
import { COOKIE_NAME, __prod__ } from './utils/constants';
import User from './users/entities/user.entity';
import { NestExpressApplication } from '@nestjs/platform-express';

const redisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS_URL);
declare module 'express-session' {
  export interface SessionData {
    user: User;
  }
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  app.set('trust proxy', 1);
  app.use(express.static('public'));

  app.use(
    session({
      name: COOKIE_NAME,
      store: new redisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'none', //CSRF
        secure: __prod__,
        domain: __prod__ ? ".vercel.app" : undefined
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
    }),
  );

  await app.listen(process.env.PORT);

  console.log(`Server is running on ${await app.getUrl()}`);
}
bootstrap();
