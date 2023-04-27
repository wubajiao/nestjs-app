/*
 * @Descripttion : 全局模块
 * @Author       : wuhaidong
 * @Date         : 2023-04-27 11:13:20
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-27 11:13:58
 */
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'Config',
      useValue: { shopName: '红浪漫' },
    },
  ],
  exports: [
    {
      provide: 'Config',
      useValue: { shopName: '红浪漫' },
    },
  ],
})
export class ConfigModule {}
