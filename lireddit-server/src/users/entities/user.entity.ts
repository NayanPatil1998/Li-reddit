import { hash } from 'argon2';
import { Exclude } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';
import Entity from 'src/Entity.abstract';
import Post from 'src/posts/entities/post.entity';
import Vote from 'src/votes/entities/vote.entity';
import {
  BeforeInsert,
  Column,
  Entity as ToEntity,
  Index,
  OneToMany,
} from 'typeorm';

@ToEntity('users')
export default class User extends Entity {
  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Index()
  @MinLength(3)
  @Column({ unique: true })
  username: string;

  @Exclude()
  @MinLength(3)
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
