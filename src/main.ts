/*
 * @Descripttion : 项目的入口文件，里边包括项目的主模块和监听端口号
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 17:14:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-25 16:50:38
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局前缀
  app.setGlobalPrefix('/api');
  // 热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // 启动端口
  await app.listen(4000);
}

bootstrap();
