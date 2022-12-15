/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:46:18
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2022-12-15 20:51:34
 */
import { Module } from '@nestjs/common';
import { GirlController } from './girl.controller';
import { GirlService } from './girl.service';

@Module({
  controllers: [GirlController],
  providers: [GirlService],
})
export class GirlModule {}
