/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-08-29 12:07:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-19 15:07:58
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockEntity, AllStockEntity } from './entities/stock.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    @InjectRepository(AllStockEntity)
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
      select: ['id', 'name', 'code', 'holdNumber', 'cost', 'exchange'],
    });
    return stocks;
  }

  async findAllHold(userId: string) {
    const stocks = await this.stockRepository.find({
      where: { user: { id: userId }, type: 1 },
      select: ['id', 'name', 'code', 'holdNumber', 'cost', 'exchange'],
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
}
