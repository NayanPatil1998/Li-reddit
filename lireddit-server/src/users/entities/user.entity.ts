import {
  IsAlphanumeric,
  IsEmail,
  isEmail,
  Min,
  MinLength,
} from 'class-validator';
import { hash } from 'argon2';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }

  toJSON(){
    return classToPlain(this)
  }
}
