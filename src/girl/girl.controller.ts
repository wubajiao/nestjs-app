/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:51:25
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-28 16:39:29
 */
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GirlService } from './girl.service';
import { CreateGirlDto } from './dto/create-girl.dto';
import { UpdateGirlDto } from './dto/update-girl.dto';
import { RetrieveGirlDto } from './dto/retrieve-girl.dto';
import { GirlPipe } from './girl.pipe';

@ApiTags('女孩')
@Controller('girl')
export class GirlController {
  constructor(private girlService: GirlService) {}
  @ApiOperation({ summary: '新增' })
  @Post('')
  addGirl(@Body(GirlPipe) createGirlDto: CreateGirlDto) {
    return this.girlService.addGirl(createGirlDto);
  }

  @ApiOperation({ summary: '编辑' })
  @Patch(':id')
  updateGirl(@Param('id') id: string, @Body() updateGirlDto: UpdateGirlDto) {
    return this.girlService.updateGirl(id, updateGirlDto);
  }

  @ApiOperation({ summary: '删除' })
  @Delete(':id')
  deleteGirl(@Param('id') id: string) {
    return this.girlService.deleteGirl(id);
  }

  @ApiOperation({ summary: '详情：根据id查找' })
  @Get(':id')
  findOne(@Param() params: RetrieveGirlDto) {
    return this.girlService.findOneById(params.id);
  }

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

  @Inject('Config')
  private shopName: string;
  @Get('/globalModule')
  globalModule(): string {
    return this.shopName;
  }
}
