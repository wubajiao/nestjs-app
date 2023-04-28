/*
 * @Descripttion : 接口过滤器
 * @Author       : wuhaidong
 * @Date         : 2023-04-27 15:02:47
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-04-28 12:14:45
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    response.status(status).json({
      data: {},
      message: exception.message,
      code: status,
      path: request.url,
    });
  }
}
