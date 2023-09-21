/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-21 14:48:46
 */
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { StockEntity } from './entities/stock.entity';
import { AllStockEntity } from './entities/allStock.entity';
import { TelegramEntity } from './entities/telegram.entity';
import { StockHsgtEntity } from './entities/stockHsgt.entity';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { AllStockService } from './allStock.service';
import { AllStockController } from './allStock.controller';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';

import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      StockEntity,
      AllStockEntity,
      TelegramEntity,
      StockHsgtEntity,
    ]),
    ScheduleModule.forRoot(), // 定时任务模块
    AuthModule,
    HttpModule, // 接口请求模块
  ],
  controllers: [StockController, AllStockController, TelegramController],
  providers: [StockService, AllStockService, TelegramService],
})
export class StockModule {}
