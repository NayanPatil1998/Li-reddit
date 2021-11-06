import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TrimMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    });

    next();
  }
}
