/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-27 12:20:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-28 10:12:32
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateOrderDto {
  @ApiProperty({ description: '用户名', example: '小满' })
  @IsNotEmpty({ message: '用户名必填' })
  @IsString()
  name: string;

  @ApiProperty({ description: '订单金额' })
  @IsNumber()
  orderMoney: number;
}
