/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-05-12 12:22:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-05-12 12:24:45
 */
import { PostsEntity } from 'src/posts/entities/posts.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 标签名
  @Column()
  name: string;

  @ManyToMany(() => PostsEntity, (post) => post.tags)
  posts: Array<PostsEntity>;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
    name: 'create_time',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
    name: 'update_time',
  })
  updateTime: Date;
}
