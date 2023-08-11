/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-27 12:20:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-08-11 16:41:12
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Girl } from '../../girl/entities/girl.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  orderDate: Date;

  @Column()
  orderMoney: number;

  @ManyToOne(() => Girl, (girl) => girl.order)
  girl: Girl; // 多对一关系c
}
