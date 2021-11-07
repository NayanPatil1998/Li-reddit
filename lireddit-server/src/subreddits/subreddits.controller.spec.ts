import { Test, TestingModule } from '@nestjs/testing';
import { SubredditsController } from './subreddits.controller';
import { SubredditsService } from './subreddits.service';

describe('SubredditsController', () => {
  let controller: SubredditsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubredditsController],
      providers: [SubredditsService],
    }).compile();

    controller = module.get<SubredditsController>(SubredditsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
