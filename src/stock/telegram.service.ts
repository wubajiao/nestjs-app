/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-21 15:06:52
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
import { eastmoneyHeaders } from './apiHeaders';

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
          console.log(
            'telegraph insert---',
            telegramData.title.replace('/[【】]/g', ''),
          );
        }
      }
    });

    return telegrams;
  }

  // 东方财富：沪深港通-北向资金、南下资金-日记别总数：https://data.eastmoney.com/hsgt/index.html
  // @Cron('*/60 * * * * *')
  async syncHsgtDate(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPT_MUTUAL_QUOTA&columns=TRADE_DATE%2CMUTUAL_TYPE%2CBOARD_TYPE%2CMUTUAL_TYPE_NAME%2CFUNDS_DIRECTION%2CINDEX_CODE%2CINDEX_NAME%2CBOARD_CODE&quoteColumns=status~07~BOARD_CODE%2CdayNetAmtIn~07~BOARD_CODE%2CdayAmtRemain~07~BOARD_CODE%2CdayAmtThreshold~07~BOARD_CODE%2Cf104~07~BOARD_CODE%2Cf105~07~BOARD_CODE%2Cf106~07~BOARD_CODE%2Cf3~03~INDEX_CODE~INDEX_f3%2CnetBuyAmt~07~BOARD_CODE&quoteType=0&pageNumber=1&pageSize=200&sortTypes=1&sortColumns=MUTUAL_TYPE&source=WEB&client=WEB&_=1695269245456`,
          { headers: eastmoneyHeaders },
        )
        .pipe(
          catchError((_error: any) => {
            throw 'An error happened!';
          }),
        ),
    );
    if (data?.code === 0) {
      return data.result.data;
    } else {
      throw new HttpException(data.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 东方财富：沪深港通-北向资金、南下资金 分钟分级别数据：https://data.eastmoney.com/hsgt/index.html
  /**
   * @param symbol ：SH000001,SH601155
   * @returns data
   * s2n 北向资金
   * n2s 南下资金
   */
  // @Cron('*/60 * * * * *')
  async syncHsgtMinute(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://push2.eastmoney.com/api/qt/kamtbs.rtmin/get?fields1=f1,f2,f3,f4&fields2=f51,f54,f52,f58,f53,f62,f56,f57,f60,f61`,
          { headers: eastmoneyHeaders },
        )
        .pipe(
          catchError((_error: any) => {
            throw 'An error happened!';
          }),
        ),
    );
    console.log(
      '🚀 ~ file: telegram.service.ts:106 ~ TelegramService ~ syncHsgtMinute ~ data:',
      data,
    );
    if (data?.full === 0) {
      return data.data;
    } else {
      throw new HttpException('500', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
