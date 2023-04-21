/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:53:45
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-17 17:55:38
 */
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Girl } from './entities/girl.entity';

@Injectable()
export class GirlService {
  constructor(
    @InjectRepository(Girl) private readonly girl: Repository<Girl>,
  ) {}

  getGirls() {
    return {
      code: 0,
      data: ['翠花', '小红', '大丫'],
      msg: '请求女孩列表成功',
    };
  }

  // 新增
  addGirl() {
    const data = new Girl();
    data.name = '大梨';
    data.age = 25;
    data.skill = '精油按摩,日式按摩';

    return this.girl.save(data);
  }

  // 修改
  updateGirl(id: string) {
    const data = new Girl();
    data.name = '小绿';
    data.age = 20;
    return this.girl.update(id, data);
  }

  // 删除
  deleteGirl(id: string) {
    return this.girl.delete(id);
  }
}
