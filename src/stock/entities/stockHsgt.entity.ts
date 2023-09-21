/*
 * @Descripttion : 24小时电报
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-20 16:58:45
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_hsgt')
export class StockHsgtEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 沪股通-净买额
  @Column({ name: 'north_h_jme' })
  northHJme: number;

  // 沪股通-买入额
  @Column({ name: 'north_h_mre' })
  northHMre: number;

  // 沪股通-卖出额
  @Column({ name: 'north_h_mce' })
  northHMce: number;

  // 深股通-净买额
  @Column({ name: 'north_s_jme' })
  northSJme: number;

  // 深股通-买入额
  @Column({ name: 'north_s_mre' })
  northSMre: number;

  // 深股通-卖出额
  @Column({ name: 'north_s_mce' })
  northSMce: number;

  // 沪股通-净买额
  @Column({ name: 'south_h_jme' })
  southHJme: number;

  // 沪股通-买入额
  @Column({ name: 'south_h_mre' })
  southHJre: number;

  // 沪股通-卖出额
  @Column({ name: 'south_h_mce' })
  southHMce: number;

  // 深股通-净买额
  @Column({ name: 'south_s_jme' })
  southSJme: number;

  // 深股通-买入额
  @Column({ name: 'south_s_mre' })
  southSMre: number;

  // 深股通-卖出额
  @Column({ name: 'south_s_mce' })
  southSMce: number;

  // 时间
  @Column()
  time: string;

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
