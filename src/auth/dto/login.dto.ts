import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  account: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '请输入密码' })
  password: string;
}
