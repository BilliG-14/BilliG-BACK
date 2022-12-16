import {
  IsArray,
  IsBoolean,
  isNumber,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { stateOfTransaction } from '../types/state.type';

export class CreateProductDTO {
  @IsNumber()
  typeOfPost: number;

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

  @IsNumber()
  stateOfTransaction: stateOfTransaction;

  @IsString()
  address: string;

  @IsNumber()
  price: number;

  @IsString()
  period: string;

  @IsArray()
  hashtag: string[];

  @IsBoolean()
  delivery: boolean;

  @IsBoolean()
  direct: boolean;
}
