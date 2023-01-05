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
  postType: postType;

  @IsString()
  category: string;

  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  imgUrl: string[];

  @IsOptional()
  @IsString()
  lender: string;

  @IsOptional()
  @IsString()
  borrower: string;

  @IsNumber()
  stateOfTransaction: stateOfTransaction;

  @IsString()
  address: string;

  @IsObject()
  price: object;

  @IsOptional()
  @IsObject()
  period: object;

  @IsObject()
  tradeWay: object;

  @IsArray()
  hashtag: string[];
}
