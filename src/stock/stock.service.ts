/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-08-31 11:15:13
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
import { CreateStockDto } from './dto/stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockEntity } from './entities/stock.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    private stockRepository: Repository<StockEntity>,
    private httpService: HttpService,
  ) {}

  async create(user: any, post: CreateStockDto) {
    const { code } = post;
    const stocks = await this.stockRepository
      .createQueryBuilder('stock')
      .leftJoinAndSelect('stock.user', 'user')
      .where({ code: code, user: { id: user.id } })
      .getOne();
    if (stocks) {
      throw new HttpException('股票已存在！', HttpStatus.BAD_REQUEST);
    }

    const created = await this.stockRepository.save({ ...post, user: user.id });

    return created.id;
  }

  async findAll(userId: string) {
    const stocks = await this.stockRepository.find({
      where: { user: { id: userId } },
      select: ['id', 'name', 'code', 'holdNumber', 'cost'],
    });
    return stocks;
  }

  async findAllHold(userId: string) {
    const stocks = await this.stockRepository.find({
      where: { user: { id: userId }, type: 1 },
      select: ['id', 'name', 'code', 'holdNumber', 'cost'],
    });
    return stocks;
  }

  async update(id: string, post: UpdateStockDto) {
    const exist = await this.stockRepository.findOne({ where: { id } });
    if (!exist) {
      throw new HttpException(
        `id为${id}的自选股不存在`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.stockRepository.update(id, post);
  }

  remove(id: string) {
    return this.stockRepository.delete(id);
  }

  // 10秒执行一次 (每小时执行一次：0 0 * * * *)
  @Cron('*/10 * * * * *')
  async handleCron(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          'https://stock.xueqiu.com/v5/stock/realtime/quotec.json?symbol=SZ300957,SH601799,hk01579',
        )
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
}
