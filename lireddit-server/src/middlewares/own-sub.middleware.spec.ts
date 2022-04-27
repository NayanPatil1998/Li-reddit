import { OwnSubMiddleware } from './own-sub.middleware';

describe('OwnSubMiddleware', () => {
  it('should be defined', () => {
    expect(new OwnSubMiddleware()).toBeDefined();
  });
});
