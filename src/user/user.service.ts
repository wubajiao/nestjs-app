/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-05-04 16:14:29
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-05-10 17:40:33
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import randomName from 'src/utils/randomName';
import * as bcrypt from 'bcryptjs';
import { WechatUserInfo } from '../auth/auth.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * 账号密码注册
   * @param registerUser
   */
  async register(registerUser: RegisterUserDto) {
    const { account, password, email } = registerUser;

    const existUser = await this.userRepository.findOne({
      where: { account },
    });

    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    // const newUser = await this.userRepository.create(registerUser); // 只是创建一个新的对象
    const user = {
      account,
      email,
      password: bcrypt.hashSync(password, 10),
      role: 'visitor',
      name: randomName(),
      status: true,
    };

    await this.userRepository.save(user);
    return await this.userRepository.findOne({ where: { account } });
  }

  async registerByWechat(userInfo: WechatUserInfo) {
    const { nickname, openid, headimgurl } = userInfo;
    const newUser = this.userRepository.create({
      name: nickname,
      openid,
      avatar: headimgurl,
    });

    return await this.userRepository.save(newUser);
  }

  async findByOpenid(openid: string) {
    return await this.userRepository.findOne({ where: { openid } });
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
