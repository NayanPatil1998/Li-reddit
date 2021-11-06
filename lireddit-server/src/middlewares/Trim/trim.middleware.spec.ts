import { TrimMiddleware } from './trim.middleware';

describe('TrimMiddleware', () => {
  it('should be defined', () => {
    expect(new TrimMiddleware()).toBeDefined();
  });
});
