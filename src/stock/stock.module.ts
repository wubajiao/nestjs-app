/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-05 17:13:10
 */
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { StockEntity } from './entities/stock.entity';
import { AllStockEntity } from './entities/allStock.entity';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { AllStockService } from './allStock.service';
import { AllStockController } from './allStock.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ScheduleModule.forRoot(), // 定时任务模块
    TypeOrmModule.forFeature([StockEntity, AllStockEntity]),
    AuthModule,
    HttpModule, // 接口请求模块
  ],
  controllers: [StockController, AllStockController],
  providers: [StockService, AllStockService],
})
export class StockModule {}
