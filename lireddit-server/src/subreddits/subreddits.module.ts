import { Module } from '@nestjs/common';
import { SubredditsService } from './subreddits.service';
import { SubredditsController } from './subreddits.controller';

@Module({
  controllers: [SubredditsController],
  providers: [SubredditsService]
})
export class SubredditsModule {}
