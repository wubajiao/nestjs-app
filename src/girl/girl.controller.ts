/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:51:25
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-28 14:09:16
 */
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  Put,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GirlService } from './girl.service';
import { CreateGirlDto } from './dto/create-girl.dto';
import { UpdateGirlDto } from './dto/update-girl.dto';
import { GirlPipe } from './girl.pipe';

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
  addGirl(@Body(GirlPipe) createGirlDto: CreateGirlDto) {
    return this.girlService.addGirl(createGirlDto);
  }

  @ApiOperation({ summary: '编辑' })
  @Put('/update/:id')
  updateGirl(@Param('id') id: string, @Body() updateGirlDto: UpdateGirlDto) {
    return this.girlService.updateGirl(id, updateGirlDto);
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
