/*
 * @Descripttion : 模块文件，在NestJS世界里主要操作的就是模块
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 17:14:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2022-12-15 20:50:55
 */
import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [GirlModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
