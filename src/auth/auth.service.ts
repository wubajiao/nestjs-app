/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-05-10 12:11:24
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-05-10 15:41:22
 */
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 创建token
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  // 登录
  async login(user: Partial<User>) {
    const token = this.createToken({
      id: user.id,
      account: user.account,
      role: user.role,
    });

    return token;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
