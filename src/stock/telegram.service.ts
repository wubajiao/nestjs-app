/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-16 21:40:37
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { TelegramEntity } from './entities/telegram.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import * as dayjs from 'dayjs';
// import * as utcPlugin from 'dayjs/plugin/utc';
// import * as timezone from 'dayjs/plugin/timezone';

// dayjs.extend(utcPlugin);
// dayjs.extend(timezone);

@Injectable()
export class TelegramService {
  constructor(
    @InjectRepository(TelegramEntity)
    private readonly telegramRepository: Repository<TelegramEntity>,
    private httpService: HttpService,
  ) {}

  // 财联社电报数据抓取
  @Cron('*/10 * * * * *')
  async syncTelegram(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://www.cls.cn/telegraph`).pipe(
        catchError((_error: any) => {
          throw 'An error happened!';
        }),
      ),
    );
    // 在这里使用 cheerio 提供的 API 解析和操作 HTML 页面
    const $ = cheerio.load(data);
    const elements: any = $('.telegraph-list');
    const telegrams = [];
    elements.each(async (_index: any, element: any) => {
      // console.log($(element).text());
      const time: any = $(element).find('.telegraph-time-box').text();
      const title = $(element).find('strong').text();
      $(element).find('.telegraph-time-box').empty();
      $(element).find('strong').empty();
      if (time) {
        const date = dayjs().format('YYYY-MM-DD');
        const exist = await this.telegramRepository.findOne({
          where: { title: title },
        });
        const telegramData: any = {
          publishTime: `${date} ${time}`,
          title,
          content: $(element).text(),
          tags: null,
        };
        if (!exist) {
          await this.telegramRepository.save(telegramData);
          telegrams.push(telegramData);
          console.log('insert-----', telegramData.title);
        }
      }
    });

    return telegrams;
  }
}
