/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-07 15:11:26
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-07 15:13:20
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
