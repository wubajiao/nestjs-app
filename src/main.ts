/*
 * @Descripttion : 项目的入口文件，里边包括项目的主模块和监听端口号
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 17:14:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-27 10:04:04
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function MiddleWareAll(req: any, res: any, next: any) {
  console.log('全局中间件');
  // next() 如果不加的话就不会执行后面的了
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局前缀
  app.setGlobalPrefix('/api');
  // 全局中间件
  app.use(MiddleWareAll);
  // 启动端口
  await app.listen(4000);
  // 热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
