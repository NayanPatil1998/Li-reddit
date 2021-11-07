import Entity from 'src/Entity.abstract';
import Subreddit from 'src/subreddits/entities/subreddit.entity';
import User from 'src/users/entities/user.entity';
import { makeRandomId } from 'src/utils/makeRandomId';
import { stringToSlug } from 'src/utils/sluggify';
import {
  BeforeInsert,
  Column,
  Entity as ToEntity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@ToEntity('posts')
export default class Post extends Entity {
  @Index()
  @Column()
  identifier: string;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  body: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Subreddit, (sub) => sub.posts)
  @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
  sub: Subreddit;

  @Column()
  subName: string;

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeRandomId(7);
    this.slug = stringToSlug(this.title);
  }
}
