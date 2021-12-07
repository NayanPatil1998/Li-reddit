import { Expose } from 'class-transformer';
import Comment from 'src/comments/entities/comment.entity';
import Entity from 'src/Entity.abstract';
import Subreddit from 'src/subreddits/entities/subreddit.entity';
import User from 'src/users/entities/user.entity';
import { makeRandomId } from 'src/utils/makeRandomId';
import { stringToSlug } from 'src/utils/sluggify';
import Vote from 'src/votes/entities/vote.entity';
import {
  BeforeInsert,
  Column,
  Entity as ToEntity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ nullable: false })
  username: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Subreddit, (sub) => sub.posts)
  @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
  sub: Subreddit;

  @Column({ nullable: false })
  subName: string;

  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Expose() get commentCount(): number {
    return this.comments?.length;
  }

  @Expose() get voteScore(): number {
    return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0);
  }

  protected userVote: number;
  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeRandomId(7);
    this.slug = stringToSlug(this.title);
  }
}
