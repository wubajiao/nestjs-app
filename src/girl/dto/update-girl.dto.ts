import { PartialType } from '@nestjs/mapped-types';
import { CreateGirlDto } from './create-girl.dto';

export class UpdateGirlDto extends PartialType(CreateGirlDto) {}
