/*
 * @Descripttion : 实体
 * @Author       : wuhaidong
 * @Date         : 2023-04-07 16:38:33
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-08-11 16:44:17
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from '../../order/entities/order.entity';

@Entity()
export class Girl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  skill: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @JoinColumn()
  order: OrderEntity[]; // 一对多关系
}
