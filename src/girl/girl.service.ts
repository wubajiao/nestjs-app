/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:53:45
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-28 16:42:14
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
    @InjectRepository(Girl)
    private girlRepository: Repository<Girl>,
  ) {}

  // 新增
  addGirl(createGirlDto: CreateGirlDto) {
    return this.girlRepository.save(createGirlDto);
  }

  // 修改
  updateGirl(id: string, updateGirlDto: UpdateGirlDto) {
    return this.girlRepository.update(id, updateGirlDto);
  }

  // 删除
  deleteGirl(id: string) {
    return this.girlRepository.delete(id);
  }

  // 列表
  getGirls() {
    return this.girlRepository.find();
  }

  // 详情
  findOneById(id: string) {
    return this.girlRepository.findOneBy({ id });
  }

  // 根据名字查出数据
  findGirlByName(name: string) {
    return this.girlRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }
}
