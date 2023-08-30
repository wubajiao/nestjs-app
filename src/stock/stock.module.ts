/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-08-30 23:46:13
 */
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { StockEntity } from './entities/stock.entity';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(), // 定时任务模块
    TypeOrmModule.forFeature([StockEntity]),
    AuthModule,
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
