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

export class UpdateProductDTO {
  @IsOptional()
  postType: postType;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  imgUrl: string[];

  @IsOptional()
  lender: string;

  @IsOptional()
  borrower: string;

  @IsOptional()
  @IsNumber()
  stateOfTransaction: stateOfTransaction;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsObject()
  price: object;

  @IsOptional()
  @IsObject()
  period: object;

  @IsOptional()
  @IsObject()
  tradeWay: object;

  @IsOptional()
  @IsArray()
  hashtag: string[];
}
