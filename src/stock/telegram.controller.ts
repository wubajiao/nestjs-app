/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-02 22:17:25
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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TelegramDto } from './dto/telegram.dto';
import { RolesGuard } from 'src/auth/role.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('7*24小时电报')
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @ApiOperation({ summary: '爬取财联社电报' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('cls')
  cailianshe() {
    return this.telegramService.syncTelegram();
  }

  /**
   * 获取电报列表，先只取前20条
   * TODO: 分页获取
   */
  @ApiOperation({ summary: '获取电报列表' })
  @Get('/list')
  async findAll(@Query() params): Promise<TelegramDto> {
    return await this.telegramService.findAll(params);
  }
}
