/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-19 12:14:02
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { AllStockEntity } from './entities/allStock.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { xueqiuHeaders } from './apiHeaders';

@Injectable()
export class AllStockService {
  constructor(
    @InjectRepository(AllStockEntity)
    private readonly allStockRepository: Repository<AllStockEntity>,
    private httpService: HttpService,
  ) {}

  // 10秒执行一次 (每小时执行一次：0 0 * * * *)
  // @Cron('*/50 * * * * *')
  async handleCron(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get('http://api.mairui.club/hslt/list/18d643330de55260b')
        .pipe(
          catchError((_error: any) => {
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
          catchError((_error: any) => {
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
          catchError((_error: any) => {
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
          catchError((_error: any) => {
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
          catchError((_error: any) => {
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
          catchError((_error: any) => {
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
          catchError((_error: any) => {
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

  /**
   * @description: 个股实时分时图-雪球
   * @param {string} symbol 股票编号： SH000001
   * @param {string} period 时间区间： 1d
   * @return {*}
   */
  // @Cron('*/60 * * * * *')
  async realtimeTradingByXueqiu(symbol: string, period: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://stock.xueqiu.com/v5/stock/chart/minute.json?symbol=${symbol}&period=${period}`,
          { headers: xueqiuHeaders },
        )
        .pipe(
          catchError((_error: any) => {
            throw 'An error happened!';
          }),
        ),
    );
    if (data.error_code === 0) {
      console.log('分时图');
      return data?.data;
    } else {
      throw new HttpException(
        data.error_code,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description: 热股榜
   * @param size: 条数，默认8
   * @param type: 类型 全部-10、美股-11、沪深-12、港股-13
   * @return {*}
   */
  async hotStock(size: number, type: number): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=${size}&type=${type}`,
          { headers: xueqiuHeaders },
        )
        .pipe(
          catchError((_error: any) => {
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

  /**
   * @description: 可以查沪、深、创业板、科创板成交额
   * @param symbol: 股票代码 SH000001,SZ399001,SZ399006,SH000688
   * @return {*}
   */
  async batch(symbol: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=${symbol}`,
          { headers: xueqiuHeaders },
        )
        .pipe(
          catchError((_error: any) => {
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

  /**
   * @description: 所有股票列表总览
   * @param
   * @return {*}
   */
  async screener(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://stock.xueqiu.com/v5/stock/screener/quote/list.json?page=1&size=5000&order=desc&orderby=percent&order_by=percent&market=CN&type=sh_sz`,
          { headers: xueqiuHeaders },
        )
        .pipe(
          catchError((_error: any) => {
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
