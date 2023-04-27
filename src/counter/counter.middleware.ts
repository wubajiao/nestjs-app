/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-27 09:46:26
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-27 10:36:05
 */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CounterMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('局部中间件');
    next();
  }
}
