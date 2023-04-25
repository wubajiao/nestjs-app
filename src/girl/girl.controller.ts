/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:51:25
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-21 12:03:12
 */
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GirlService } from './girl.service';

@Controller('girl')
export class GirlController {
  constructor(private girlService: GirlService) {}
  @Get('list')
  getGirls() {
    return this.girlService.getGirls();
  }

  @Get('/findGirlByName/:name')
  findGirlByName(@Param() params: any) {
    const { name } = params;
    return this.girlService.findGirlByName(name);
  }

  @Post('/add')
  addGirl() {
    return this.girlService.addGirl();
  }

  @Put('/update/:id')
  updateGirl(@Param() params: any) {
    const { id } = params;
    return this.girlService.updateGirl(id);
  }

  @Delete('/delete/:id')
  deleteGirl(@Param() params: any) {
    const { id } = params;
    return this.girlService.deleteGirl(id);
  }
}
