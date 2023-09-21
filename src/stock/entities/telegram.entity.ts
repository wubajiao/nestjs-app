/*
 * @Descripttion : 24小时电报
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-21 14:44:37
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('telegram')
export class TelegramEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 标题
  @Column({ length: 255 })
  title: string;

  // 内容
  @Column({ type: 'text' })
  content: string;

  // 标签
  @Column()
  tags: string;

  // 发布时间
  @Column({
    name: 'publish_time',
  })
  publishTime: string;

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
