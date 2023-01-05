import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UpdateProductDTO } from './updateProduct.dto';

export class FindProductDTO extends UpdateProductDTO {
  @IsOptional()
  @IsString()
  per: number;

  @IsOptional()
  @IsString()
  page: number;
}
