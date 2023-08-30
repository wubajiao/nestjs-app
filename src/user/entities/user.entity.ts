/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-05-04 16:14:29
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-08-30 16:11:29
 */
import {
  // BeforeInsert,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { PostsEntity } from 'src/posts/entities/posts.entity';
import { StockEntity } from 'src/stock/entities/stock.entity';
@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  account: string;

  @Column()
  email: string;

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string;

  @Column({ default: null, select: false }) // 表示隐藏此列,只在查询时生效
  password: string; // 密码

  @Column() // 表示隐藏此列,只在查询时生效
  verificationCode: string;

  @Column({ default: null })
  avatar: string;

  @Column({ default: null })
  openid: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  createTime: Date;

  @CreateDateColumn()
  updatedTime: Date;

  @OneToMany(() => PostsEntity, (post) => post.author)
  posts: PostsEntity[];

  @OneToMany(() => StockEntity, (stock) => stock.user)
  stock: StockEntity[];
}
