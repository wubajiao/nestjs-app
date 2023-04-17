/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:46:18
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-07 16:40:31
 */
import { Module } from '@nestjs/common';
import { GirlController } from './girl.controller';
import { GirlService } from './girl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Girl } from './entities/girl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Girl])],
  controllers: [GirlController],
  providers: [GirlService],
})
export class GirlModule {}
