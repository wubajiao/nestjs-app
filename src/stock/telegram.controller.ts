/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-21 14:21:48
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
import { TelegramService } from './telegram.service';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @ApiOperation({ summary: '爬取财联社电报' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('cls')
  cailianshe() {
    return this.telegramService.syncTelegram();
  }

  @ApiOperation({ summary: '北上、南下资金-日汇总' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('hsgtDate')
  hsgtDate() {
    return this.telegramService.syncHsgtDate();
  }

  @ApiOperation({ summary: '北上、南下资金-分钟级别' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('hsgtMinute')
  hsgtMinute() {
    return this.telegramService.syncHsgtMinute();
  }
}
