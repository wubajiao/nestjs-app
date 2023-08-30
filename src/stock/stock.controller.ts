/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-08-30 23:38:31
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
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiOperation({ summary: '添加自选股' })
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createStockDto: CreateStockDto, @Req() req: any) {
    return this.stockService.create(req.user, createStockDto);
  }

  @ApiOperation({ summary: '获取当前用户自选股' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  findAll(@Req() req: any) {
    return this.stockService.findAll(req.user.id);
  }

  @ApiOperation({ summary: '获取当前用户持仓列表' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('hold')
  findAllHold(@Req() req: any) {
    return this.stockService.findAllHold(req?.user?.id);
  }

  @ApiOperation({ summary: '更新自选股' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @ApiOperation({ summary: '删除自选股' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(id);
  }
}
