/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-27 12:20:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-27 17:52:35
 */
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
  @ApiProperty({ description: '用户名', example: '小满' })
  name: string;
  @ApiProperty({ description: '订单金额' })
  orderMoney: number;
}
