/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-04-28 11:29:48
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-28 14:17:30
 */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class GirlPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value);
    const errors = await validate(DTO);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    console.log(errors);

    return value;
  }
}
