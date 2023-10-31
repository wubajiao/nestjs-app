/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-05-10 12:11:24
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-30 14:47:25
 */
import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from './../user/user.service';
import {
  AccessTokenInfo,
  AccessConfig,
  WechatError,
  WechatUserInfo,
} from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private httpService: HttpService,
  ) {}

  private accessTokenInfo: AccessTokenInfo;
  public apiServer = 'https://api.weixin.qq.com';

  // 创建token
  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user);
  }

  // 登录
  async login(user: Partial<UserEntity>) {
    const token = this.createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const userInfo = {
      id: user.id,
      name: user.name,
      account: user.account,
      email: user.email,
      avatar: user.avatar,
    };

    return { token, user: userInfo };
  }

  async getUser(user) {
    return await this.userService.findOne(user.id);
  }

  async loginWithWechat(code) {
    if (!code) {
      throw new BadRequestException('请输入微信授权码');
    }
    await this.getAccessToken(code);

    const user = await this.getUserByOpenid();
    if (!user) {
      // 获取用户信息，注册新用户
      const userInfo: WechatUserInfo = await this.getUserInfo();
      return this.userService.registerByWechat(userInfo);
    }
    return this.login(user);
  }

  // 通过微信openId 获取用户
  async getUserByOpenid() {
    return await this.userService.findByOpenid(this.accessTokenInfo.openid);
  }

  // 获取微信用户信息
  async getUserInfo() {
    const result: AxiosResponse<WechatError & WechatUserInfo> =
      await lastValueFrom(
        this.httpService.get(
          `${this.apiServer}/sns/userinfo?access_token=${this.accessTokenInfo.accessToken}&openid=${this.accessTokenInfo.openid}`,
        ),
      );
    if (result.data.errcode) {
      throw new BadRequestException(
        `[getUserInfo] errcode:${result.data.errcode}, errmsg:${result.data.errmsg}`,
      );
    }
    console.log('result', result.data);

    return result.data;
  }

  // 获取微信accessToken
  async getAccessToken(code) {
    const { APPID, APPSECRET } = process.env;
    if (!APPSECRET) {
      throw new BadRequestException('[getAccessToken]必须有appSecret');
    }
    if (
      !this.accessTokenInfo ||
      (this.accessTokenInfo && this.isExpires(this.accessTokenInfo))
    ) {
      // 请求accessToken数据
      const res: AxiosResponse<WechatError & AccessConfig, any> =
        await lastValueFrom(
          this.httpService.get(
            `${this.apiServer}/sns/oauth2/access_token?appid=${APPID}&secret=${APPSECRET}&code=${code}&grant_type=authorization_code`,
          ),
        );

      if (res.data.errcode) {
        throw new BadRequestException(
          `[getAccessToken] errcode:${res.data.errcode}, errmsg:${res.data.errmsg}`,
        );
      }
      this.accessTokenInfo = {
        accessToken: res.data.access_token,
        expiresIn: res.data.expires_in,
        getTime: Date.now(),
        openid: res.data.openid,
      };
    }

    return this.accessTokenInfo.accessToken;
  }

  // 判断accesstoken是否过期
  isExpires(access) {
    return Date.now() - access.getTime > access.expiresIn * 1000;
  }
}
