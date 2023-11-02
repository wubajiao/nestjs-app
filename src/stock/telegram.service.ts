/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-01 23:18:06
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { TelegramEntity } from './entities/telegram.entity';
// import { StockHsgtEntity } from './entities/stockHsgt.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import * as dayjs from 'dayjs';

@Injectable()
export class TelegramService {
  constructor(
    @InjectRepository(TelegramEntity)
    private readonly telegramRepository: Repository<TelegramEntity>,
    // @InjectRepository(StockHsgtEntity)
    // private readonly stockHsgtRepository: Repository<StockHsgtEntity>,
    private httpService: HttpService,
  ) {}

  // 财联社电报数据抓取
  @Cron('*/30 * * * * *')
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
      const titleText = $(element).find('strong').text();
      const contentEl = $(element).find('.telegraph-content-box');
      $(contentEl).find('.telegraph-time-box').empty();
      $(contentEl).find('strong').empty();

      const tags = [];
      const tagsEl = $(element).find('.label-item');
      tagsEl.each((_index: any, tagEl: any) => {
        tags.push($(tagEl).text());
      });

      if (time) {
        const date = dayjs().format('YYYY-MM-DD');
        const title = titleText.replace(/[【】]/g, '');
        const exist = await this.telegramRepository.findOne({
          where: { title: title },
        });
        const telegramData: any = {
          publishTime: `${date} ${time}`,
          title,
          content: $(contentEl).text(),
          from: '财联社',
          tags: JSON.stringify(tags),
        };
        if (!exist) {
          await this.telegramRepository.save(telegramData);
          telegrams.push(telegramData);
          console.log('telegraph insert---', telegramData.title);
        }
      }
    });

    return telegrams;
  }

  // 获取电报列表
  async findAll(body): Promise<any> {
    const qb = await this.telegramRepository
      .createQueryBuilder('telegram')
      .orderBy('telegram.publish_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 20 } = body;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const telegrams: any = await qb.getMany();
    const result = telegrams.map((item: any) => item.toResponseObject());
    return { list: result, count: count };
  }
}
