/*
 * @Descripttion : 实体
 * @Author       : wuhaidong
 * @Date         : 2023-04-07 16:38:33
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-07 16:44:53
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Girl {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  skill: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}
