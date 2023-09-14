/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-14 16:03:53
 */
import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AllStockService } from './allStock.service';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('allStock')
export class AllStockController {
  constructor(private readonly allStockService: AllStockService) {}

  @ApiOperation({ summary: '更新沪深两市股票数据库' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('syncStockDB')
  syncStockDB(@Param('id') id: string) {
    return this.allStockService.syncStockDB();
  }

  @ApiOperation({ summary: '获取股票实时数据' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('realtime')
  realtime(@Query('symbol') symbol: string) {
    return this.allStockService.realtime(symbol);
  }

  @ApiOperation({ summary: '涨跌股票统计' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('upDownNumber')
  upDownNumber() {
    return this.allStockService.upDownNumber();
  }

  @ApiOperation({ summary: '股东数变化' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('shareholder')
  shareholder(@Query('symbol') symbol: string) {
    return this.allStockService.shareholder(symbol);
  }

  @ApiOperation({ summary: '个股实时交易数据' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('realtimeTrading')
  realtimeTrading(@Query('symbol') symbol: string) {
    return this.allStockService.realtimeTrading(symbol);
  }

  @ApiOperation({ summary: '百度热搜' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('baiduTopNews')
  baiduTopNews() {
    return this.allStockService.baiduTopNews();
  }

  @ApiOperation({ summary: '个股实时交易分时图数据-雪球数据源' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('realtimeTradingByXueqiu')
  realtimeTradingByXueqiu(@Query() params: { symbol: string; period: string }) {
    const { symbol, period } = params;
    return this.allStockService.realtimeTradingByXueqiu(symbol, period);
  }
}
