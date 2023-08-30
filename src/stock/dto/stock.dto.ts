/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-08-29 17:59:27
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStockDto {
  @ApiProperty({ description: '股票名称' })
  @IsNotEmpty({ message: '股票名称必填' })
  readonly name: string;

  @ApiPropertyOptional({ description: '股票编码' })
  @IsNotEmpty({ message: '股票编码必填' })
  readonly code: string;

  @ApiPropertyOptional({ description: '分类 0默认，1持仓' })
  readonly type: number;

  @ApiPropertyOptional({ description: '持仓数' })
  readonly holdNumber: number;

  @ApiProperty({ description: '持仓成本' })
  readonly cost: number;

  @ApiPropertyOptional({ description: '预警价格' })
  readonly warningPrice: number;
}
