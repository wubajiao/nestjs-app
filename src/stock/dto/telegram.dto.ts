/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-01 22:59:25
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TelegramDto {
  @ApiProperty({ description: '标题' })
  readonly title: string;

  @ApiPropertyOptional({ description: '内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '标签' })
  readonly tags: string;

  @ApiPropertyOptional({ description: '电报发布时间' })
  readonly publishTime: string;
}
