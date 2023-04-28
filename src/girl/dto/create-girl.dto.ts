/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-28 10:27:11
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-28 11:50:33
 */
/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-27 12:20:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-28 10:44:20
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateGirlDto {
  @ApiProperty({ description: '用户名', example: '小满' })
  @IsNotEmpty({ message: '用户名必填' })
  @IsString({ message: '字符串' })
  name: string;

  @ApiProperty({ description: '年龄' })
  @IsNumber()
  age: number;

  @ApiProperty({ description: '技能' })
  @IsString()
  skill: string;
}
