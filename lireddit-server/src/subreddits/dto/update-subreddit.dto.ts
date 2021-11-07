import { PartialType } from '@nestjs/mapped-types';
import { CreateSubredditDto } from './create-subreddit.dto';

export class UpdateSubredditDto extends PartialType(CreateSubredditDto) {}
