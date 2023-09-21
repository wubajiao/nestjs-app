/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-21 17:16:38
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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('各站点股票接口转发')
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

  @ApiOperation({ summary: '热股榜' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('hotStock')
  hotStock(@Query() params: { size: number; type: number }) {
    const { size, type } = params;
    return this.allStockService.hotStock(size, type);
  }

  @ApiOperation({ summary: '个股实时交易数据详情-可查成交额' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('batch')
  batch(@Query() params: { symbol: string }) {
    const { symbol } = params;
    return this.allStockService.batch(symbol);
  }

  @ApiOperation({ summary: '沪深股票总览' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('screener')
  screener() {
    return this.allStockService.screener();
  }

  @ApiOperation({ summary: '北上、南下资金-日汇总' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('hsgtDate')
  hsgtDate() {
    return this.allStockService.syncHsgtDate();
  }

  @ApiOperation({ summary: '北上、南下资金-分钟级别' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('hsgtMinute')
  hsgtMinute() {
    return this.allStockService.syncHsgtMinute();
  }
}
