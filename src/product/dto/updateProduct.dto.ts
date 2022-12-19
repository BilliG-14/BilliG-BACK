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
  contents: string;

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
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  period: string;

  @IsOptional()
  @IsArray()
  hashtag: string[];

  @IsOptional()
  @IsBoolean()
  delivery: boolean;

  @IsOptional()
  @IsBoolean()
  direct: boolean;
}
