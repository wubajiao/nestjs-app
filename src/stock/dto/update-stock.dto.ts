import { PartialType } from '@nestjs/swagger';
import { CreateStockDto } from './stock.dto';

export class UpdateStockDto extends PartialType(CreateStockDto) {}
