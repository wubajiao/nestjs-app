/*
 * @Descripttion : 模块文件，在NestJS世界里主要操作的就是模块
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 17:14:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-26 16:45:51
 */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    // 配置加载配置文件
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    // mysql连接
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        host: configService.get('DB_HOST'), // 数据库的连接地址host
        port: configService.get('DB_PORT'), // 数据库的端口 3306
        username: configService.get('DB_USERNAME'), // 连接账号
        password: configService.get('DB_PASSWORD'), // 连接密码
        database: configService.get('DB_DATABASE'), // 连接的表名
        synchronize: false, // 是否将实体同步到数据库
        retryDelay: 500, // 重试连接数据库间隔
        retryAttempts: 10, // 充实次数
        autoLoadEntities: true,
      }),
      // type: 'mysql', // 数据库类型
      // host: 'localhost', // 数据库的连接地址host
      // port: 3306, // 数据库的端口 3306
      // username: 'root', // 连接账号
      // password: '123456', // 连接密码
      // database: 'nest-app', // 连接的表名
      // retryDelay: 500, // 重试连接数据库间隔
      // retryAttempts: 10, // 充实次数
      // // synchronize: true, // 是否将实体同步到数据库
      // autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
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
    PostsModule,
    UserModule,
    AuthModule,
    TagModule,
    CategoryModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
