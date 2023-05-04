/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-05-04 16:14:29
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-05-04 16:38:50
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
