/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-05 17:14:35
 */
import {
  Controller,
  Get,
  Post,
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
}
