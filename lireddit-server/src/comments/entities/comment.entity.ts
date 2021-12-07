import Entity from 'src/Entity.abstract';
import Post from 'src/posts/entities/post.entity';
import User from 'src/users/entities/user.entity';
import { makeRandomId } from 'src/utils/makeRandomId';
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

@ToEntity('comments')
export default class Comment extends Entity {
  @Index()
  @Column()
  identifier: string;

  @Column({ nullable: false, type: 'text' })
  body: string;

  @Column()
  username: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];

  protected userVote: number;
  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeRandomId(9);
  }
}
