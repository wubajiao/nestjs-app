/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-07 15:12:42
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-07 15:19:34
 */
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('list')
  getGirls() {
    return 'user list';
  }
}
