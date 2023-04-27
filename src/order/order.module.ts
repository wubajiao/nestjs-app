/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-27 12:20:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-27 12:30:24
 */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
