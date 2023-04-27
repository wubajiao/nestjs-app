/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-27 12:06:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-27 12:18:17
 */
import {
  Entity,
  OneToOne,
  //   Column,
  //   PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Girl } from './girl.entity';

@Entity()
export class GirlDetail {
  // ...
  @OneToOne(() => Girl)
  @JoinColumn({ name: 'girl_id' })
  girl: Girl;
}
