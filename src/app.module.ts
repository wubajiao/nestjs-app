/*
 * @Descripttion : 模块文件，在NestJS世界里主要操作的就是模块
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 17:14:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-08-11 17:00:44
 */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GirlModule } from './girl/girl.module';
import { ConfigModule } from './config/config.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { PostsModule } from './posts/posts.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库的连接地址host
      port: 3306, // 数据库的端口 3306
      username: 'root', // 连接账号
      password: '123456', // 连接密码
      database: 'nest-app', // 连接的表名
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 充实次数
      // synchronize: true, // 是否将实体同步到数据库
      autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
      entities: [User], // 这里为什么要引入? 还不太明白
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
          user: '1058486292@qq.com',
          pass: 'cybmbjhrdulxbeid',
        },
      },
      defaults: {
        from: '"喜财科技"<1058486292@qq.com>',
      },
      template: {
        dir: path.join(__dirname, '../src/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot('洗浴中心'),
    GirlModule,
    PostsModule,
    UserModule,
    OrderModule,
    AuthModule,
    TagModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
