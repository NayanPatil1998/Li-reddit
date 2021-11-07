import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Not Authenticated' });
      // throw new Error('Not Authenticated');
    }
    next();
  }
}
