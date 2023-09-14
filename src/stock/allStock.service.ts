/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-14 16:02:20
 */
import {
  Injectable,
  HttpException,
  HttpStatus,
  HttpServer,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { AllStockEntity } from './entities/allStock.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AllStockService {
  constructor(
    @InjectRepository(AllStockEntity)
    private allStockRepository: Repository<AllStockEntity>,
    private httpService: HttpService,
  ) {}

  // 10秒执行一次 (每小时执行一次：0 0 * * * *)
  // @Cron('*/50 * * * * *')
  async handleCron(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get('http://api.mairui.club/hslt/list/18d643330de55260b')
        .pipe(
          catchError((error: any) => {
            // TODO handle error log
            // this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    console.log('🚀 ~ data:', data);

    return data;
  }

  // 更新沪深股票列表数据库
  async syncStockDB(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get('http://api.mairui.club/hslt/list/18d643330de55260b')
        .pipe(
          catchError((error: any) => {
            throw 'An error happened!';
          }),
        ),
    );
    if (data && data.length > 0) {
      for (const item of data) {
        const exist = await this.allStockRepository.findOne({
          where: { code: item.code },
        });
        const stockData = new AllStockEntity();
        stockData.code = item.dm;
        stockData.name = item.mc;
        stockData.exchange = item.jys;
        if (!exist) {
          await this.allStockRepository.save(stockData);
          console.log('insert');
        } else {
          await this.allStockRepository.update(exist.id, stockData);
          console.log('Updated', stockData.code);
        }
      }
    }

    return data;
  }

  // 获取股票实时数据
  /**
   * @param symbol ：SH000001,SH601155
   * @returns
   */
  async realtime(symbol): Promise<any> {
    const { data } = await firstValueFrom(
      // 雪球
      this.httpService
        .get(
          `https://stock.xueqiu.com/v5/stock/realtime/quotec.json?symbol=${symbol}`,
        )
        .pipe(
          catchError((error: any) => {
            throw 'An error happened!';
          }),
        ),
    );
    if (data.error_code === 0) {
      return data?.data;
    } else {
      throw new HttpException(
        data.error_code,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 涨跌统计
  async upDownNumber(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`http://api.mairui.club/zs/lsgl/18d643330de55260b`)
        .pipe(
          catchError((error: any) => {
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  // 股东数变化
  async shareholder(symbol): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`http://api.mairui.club/hscp/gdbh/${symbol}/18d643330de55260b`)
        .pipe(
          catchError((error: any) => {
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  // 个股实时交易数据
  async realtimeTrading(symbol): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`http://api.mairui.club/hsrl/ssjy/${symbol}/18d643330de55260b`)
        .pipe(
          catchError((error: any) => {
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  // 百度热搜
  async baiduTopNews(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://top.baidu.com/api/board?platform=wise&tab=realtime`)
        .pipe(
          catchError((error: any) => {
            throw 'An error happened!';
          }),
        ),
    );
    if (data.success) {
      return data?.data;
    } else {
      throw new HttpException(
        data.error.code,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 个股实时分时图-雪球
  /**
   * @param symbol SH000001
   * @param period 1d
   * @returns data
   */
  async realtimeTradingByXueqiu(symbol: string, period: string): Promise<any> {
    const headers = {
      Host: 'stock.xueqiu.com',
      Referer: 'https://xueqiu.com/',
      Accept: 'application/json',
      Cookie: 'xq_a_token=b0e9bcf7d6096be99ca9b45b9e938949e929c316;',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://stock.xueqiu.com/v5/stock/chart/minute.json?symbol=${symbol}&period=${period}`,
          { headers: headers },
        )
        .pipe(
          catchError((error: any) => {
            throw 'An error happened!';
          }),
        ),
    );
    if (data.error_code === 0) {
      return data?.data;
    } else {
      throw new HttpException(
        data.error_code,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
