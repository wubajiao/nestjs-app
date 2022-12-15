/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:53:45
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2022-12-15 21:12:37
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
}
