import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormConfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { TrimMiddleware } from './middlewares/Trim/trim.middleware';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { SubredditsModule } from './subreddits/subreddits.module';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    ConfigModule.forRoot(),
    PostsModule,
    SubredditsModule,
    CommentsModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'posts', method: RequestMethod.POST });
    consumer.apply(AuthMiddleware).forRoutes('subreddits');
    consumer.apply(AuthMiddleware).forRoutes('comments');
  }
}
