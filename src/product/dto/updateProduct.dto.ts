import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { productDTO } from './product.dto';

export class updateProductDTO extends PartialType(productDTO) {}
