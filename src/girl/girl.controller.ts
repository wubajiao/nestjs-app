/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:51:25
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-27 16:25:00
 */
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GirlService } from './girl.service';

@ApiTags('女孩')
@Controller('girl')
export class GirlController {
  constructor(private girlService: GirlService) {}
  @ApiOperation({ summary: '列表' })
  @Get('list')
  getGirls() {
    return this.girlService.getGirls();
  }

  @ApiOperation({ summary: '通过名字查询' })
  @Get('/findGirlByName/:name')
  findGirlByName(@Param() params: any) {
    const { name } = params;
    return this.girlService.findGirlByName(name);
  }

  @ApiOperation({ summary: '新增' })
  @Post('/add')
  addGirl() {
    return this.girlService.addGirl();
  }

  @ApiOperation({ summary: '编辑' })
  @Put('/update/:id')
  updateGirl(@Param() params: any) {
    const { id } = params;
    return this.girlService.updateGirl(id);
  }

  @ApiOperation({ summary: '删除' })
  @Delete('/delete/:id')
  deleteGirl(@Param() params: any) {
    const { id } = params;
    return this.girlService.deleteGirl(id);
  }

  @Inject('Config')
  private shopName: string;
  @Get('/globalModule')
  globalModule(): string {
    return this.shopName;
  }
}
