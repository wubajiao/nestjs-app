/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:53:45
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-07 14:58:53
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class GirlService {
  getGirls() {
    return {
      code: 0,
      data: ['翠花', '小红', '大丫'],
      msg: '请求女孩列表成功',
    };
  }
  addGirl() {
    return {
      code: 0,
      data: { id: 1, name: '小绿', age: 20 },
      msg: '新增成功！',
    };
  }

  deleteGirl() {
    return {
      code: 0,
      data: true,
      msg: '删除成功！',
    };
  }
}
