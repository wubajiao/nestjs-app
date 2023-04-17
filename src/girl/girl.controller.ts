/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:51:25
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-07 16:55:57
 */
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { GirlService } from './girl.service';

@Controller('girl')
export class GirlController {
  constructor(private girlService: GirlService) {}
  @Get('list')
  getGirls() {
    return this.girlService.getGirls();
  }

  @Post('add')
  addGirl() {
    return this.girlService.addGirl();
  }

  @Put('/:id')
  updateGirl() {
    return 'update';
  }

  @Delete('delete/:id')
  deleteGirl() {
    return this.girlService.deleteGirl();
  }
}
