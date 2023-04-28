/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:53:45
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-28 14:09:05
 */
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Girl } from './entities/girl.entity';
import { CreateGirlDto } from './dto/create-girl.dto';
import { UpdateGirlDto } from './dto/update-girl.dto';

@Injectable()
export class GirlService {
  constructor(
    @InjectRepository(Girl) private readonly girl: Repository<Girl>,
  ) {}

  // 列表
  getGirls() {
    return this.girl.find();
  }

  // 根据名字查出数据
  findGirlByName(name: string) {
    return this.girl.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }

  // 新增
  addGirl(createGirlDto: CreateGirlDto) {
    return this.girl.save(createGirlDto);
  }

  // 修改
  updateGirl(id: string, updateGirlDto: UpdateGirlDto) {
    return this.girl.update(id, updateGirlDto);
  }

  // 删除
  deleteGirl(id: string) {
    return this.girl.delete(id);
  }
}
