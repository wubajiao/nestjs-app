/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-05-10 12:11:24
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-05-10 14:57:44
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { LocalStorage } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';

const jwtModule = JwtModule.register({
  secret: 'test123456',
  signOptions: { expiresIn: '1h' },
});

// 实际开发 从环境变量中获取
// const jwtModule = JwtModule.registerAsync({
//   inject: [ConfigService],
//   useFactory: async (configService: ConfigService) => {
//     return {
//       secret: configService.get('SECRET', 'test123456'),
//       signOptions: { expiresIn: '4h' },
//     };
//   },
// });

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    jwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage],
  exports: [jwtModule],
})
export class AuthModule {}
