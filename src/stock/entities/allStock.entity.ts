/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-08-31 14:59:13
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('all_stock')
export class AllStockEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 股票名称
  @Column({ length: 50 })
  name: string;

  // 股票编码
  @Column()
  code: string;

  // 交易所 'sh': 上海、'sz': 深圳
  @Column({ default: 0 })
  exchange: string;

  @Column({
    type: 'timestamp',
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    type: 'timestamp',
    name: 'update_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
