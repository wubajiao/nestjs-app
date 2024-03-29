/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-18 14:50:27
 */
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('stock')
export class StockEntity {
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

  // 分类 0自选、1持仓
  @Column({ default: 0 })
  type: number;

  // 持仓数
  @Column({ default: null, name: 'hold_number' })
  holdNumber: number;

  // 成本
  @Column({ type: 'float', default: null })
  cost: number;

  // 预警价格
  @Column({ type: 'float', default: null, name: 'warning_price' })
  warningPrice: number;

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

  @ManyToOne(() => UserEntity, (user) => user.stock)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;
}

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
