import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateProductDTO } from './createProduct.dto';

export class productDTO extends PartialType(CreateProductDTO) {
  @IsString()
  id: string;
}
