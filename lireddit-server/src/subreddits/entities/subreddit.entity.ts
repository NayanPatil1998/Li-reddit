import User from '../../users/entities/user.entity';
import {
  Index,
  Column,
  ManyToOne,
  JoinColumn,
  Entity as ToEntity,
  OneToMany,
} from 'typeorm';
import Entity from '../../Entity.abstract';
import Post from 'src/posts/entities/post.entity';

@ToEntity('subs')
export default class Subreddit extends Entity {
  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column({ nullable: true })
  bannerUrn: string;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;
}