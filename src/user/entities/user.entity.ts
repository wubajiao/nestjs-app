/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-05-04 16:14:29
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-05-11 17:28:04
 */
import {
  // BeforeInsert,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  account: string;

  @Column()
  email: string;

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string;

  @Column({ select: false }) // 表示隐藏此列,只在查询时生效
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
}
