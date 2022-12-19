import {
  IsArray,
  IsBoolean,
  isNumber,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { postType, stateOfTransaction } from '../types/state.type';

export class CreateProductDTO {
  @IsOptional()
  postType: postType;

  @IsString()
  category: string;

  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsString()
  contents: string;

  @IsOptional()
  imgUrl: string[];

  @IsOptional()
  lender: string;

  @IsOptional()
  borrower: string;

  @IsString()
  stateOfTransaction: string;

  @IsString()
  address: string;

  @IsString()
  price: string;

  @IsString()
  period: string;

  @IsString()
  hashtag: string;

  @IsString()
  delivery: string;

  @IsString()
  direct: string;
}
