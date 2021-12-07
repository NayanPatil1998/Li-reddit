import Comment from 'src/comments/entities/comment.entity';
import Entity from 'src/Entity.abstract';
import Post from 'src/posts/entities/post.entity';
import User from 'src/users/entities/user.entity';
import {
  Column,
  Entity as ToEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@ToEntity('votes')
export default class Vote extends Entity {
  @Column()
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Column()
  username: string;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => Comment)
  comment: Comment;
}
