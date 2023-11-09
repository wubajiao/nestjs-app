/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-09 15:34:06
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { AllStockEntity } from './entities/allStock.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { xueqiuHeaders, eastmoneyHeaders } from './apiHeaders';

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

  // 通过关键字查询股票
  async queryStockByKeyword(keyword: string): Promise<any> {
    const queryBuilder = this.allStockRepository
      .createQueryBuilder('all_stock')
      .where('all_stock.name LIKE :keyword OR all_stock.code LIKE :keyword', {
        keyword: `%${keyword}%`,
      });
    return await queryBuilder.getMany();
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
   * @description: 可以查沪、深、创业板、科创板、个股成交额，包括港股
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

  /**
   * @from 东方财富：沪深港通-北向资金、南下资金 分钟分级别数据：https://data.eastmoney.com/hsgt/index.html
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
    return data;
  }

  /**
   * @form 东方财富：https: //emdatah5.eastmoney.com/dc/nxfxb/index
   * @param symbol ：SH000001,SH601155
   * @returns data
   * type: 0当日实时数据、近30天每日数据
   */
  async upDownNumber(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://emdatah5.eastmoney.com/dc/NXFXB/GetUpDownData?type=0`)
        .pipe(
          catchError((_error: any) => {
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  /**
   * @form 东方财富：https: //data.eastmoney.com/zjlx/dpzjlx.html
   * @param symbol ：SH000001,SH601155
   * @returns data
   * type: 0当日实时数据、近30天每日数据
   */
  async marketFlow(): Promise<any> {
    const timestamp = new Date().getTime();
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://push2.eastmoney.com/api/qt/stock/fflow/kline/get?lmt=0&klt=1&fields1=f1%2Cf2%2Cf3%2Cf7&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64%2Cf65&ut=b2884a393a59ad64002292a3e90d46a5&secid=1.000001&secid2=0.399001&_=${timestamp}`,
        )
        .pipe(
          catchError((_error: any) => {
            throw 'An error happened!';
          }),
        ),
    );

    return data.data;
  }
}
