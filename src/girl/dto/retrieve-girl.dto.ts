/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-28 15:58:17
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-28 16:05:30
 */
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveGirlDto {
  @ApiProperty()
  @IsString()
  id: string;
}
