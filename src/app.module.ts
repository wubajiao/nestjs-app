/*
 * @Descripttion : 模块文件，在NestJS世界里主要操作的就是模块
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 17:14:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-27 14:27:10
 */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { OrderModule } from './order/order.module';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { Order } from './order/entities/order.entity';

@Module({
  imports: [
    GirlModule,
    UserModule,
    ConfigModule.forRoot('洗浴中心'),
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库的连接地址host
      port: 3306, // 数据库的端口 3306
      username: 'root', // 连接账号
      password: '123456', // 连接密码
      database: 'nest-app', // 连接的表名
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 充实次数
      synchronize: true, // 是否将实体同步到数据库
      autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
    }),
    OrderModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}
