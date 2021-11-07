import { Test, TestingModule } from '@nestjs/testing';
import { SubredditsService } from './subreddits.service';

describe('SubredditsService', () => {
  let service: SubredditsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubredditsService],
    }).compile();

    service = module.get<SubredditsService>(SubredditsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
