import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import Subreddit from 'src/subreddits/entities/subreddit.entity';
import User from 'src/users/entities/user.entity';

@Injectable()
export class OwnSubMiddleware implements NestMiddleware {
 async use(req: Request, res: any, next: () => void) {

    const user: User = req.session.user

  try {
    const sub = await Subreddit.findOneOrFail({ where: { name: req.params.name } })

    console.log(sub)

    if (sub.username !== user.username) {
      return res.status(403).json({ error: 'You dont own this sub' })
    }

    res.locals.sub = sub
    return next()
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
  }
}
