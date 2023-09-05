/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-05 22:02:50
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
}
