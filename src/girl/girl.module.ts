/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2022-12-15 20:46:18
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-27 10:34:44
 */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GirlController } from './girl.controller';
import { GirlService } from './girl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Girl } from './entities/girl.entity';
import { CounterMiddleware } from '../counter/counter.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Girl])],
  controllers: [GirlController],
  providers: [GirlService],
})
export class GirlModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CounterMiddleware)
      .forRoutes({ path: 'girl', method: RequestMethod.GET });
  }
}
