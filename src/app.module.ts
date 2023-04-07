/*
 * @Descripttion : 模块文件，在NestJS世界里主要操作的就是模块
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 17:14:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-07 16:33:53
 */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GirlModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库的连接地址host
      port: 3306, // 数据库的端口 3306
      username: 'root', // 连接账号
      password: '123456', // 连接密码
      database: 'nest-app', // 连接的表名
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 允许重连次数
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
