/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-05-10 12:11:24
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-05-10 14:48:13
 */
import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    return req.user;
  }
}
