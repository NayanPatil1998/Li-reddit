import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { VoteDTO } from './dto/vote.dto';
import { VotesService } from './votes.service';
import { Request, Response } from 'express';
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  doVote(
    @Body() voteDTO: VoteDTO,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return this.votesService.vote(voteDTO, request, response);
  }
}
