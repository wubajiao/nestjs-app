/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-05-04 16:14:29
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-05-04 17:01:58
 */
import {
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
  role: string;

  @Column()
  password: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  createTime: Date;

  @CreateDateColumn()
  updatedTime: Date;
}
