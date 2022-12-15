import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { stateOfTransaction } from '../entites/state.entity';

export type ProductDocument = HydratedDocument<Product>;

// 게시물 고유번호
// 거래타입
// 카테고리
// 작성자
// 제목
// 내용
// 이미지
// 빌려주는 사람
// 빌리는 사람
// 거래 상태
// 주소
// 가격
// 기간

@Schema()
export class Product {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  typeOfPost: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  contents: string;

  @Prop({ required: true })
  imgUrl: string[];

  @Prop({ required: true })
  lender: string;

  @Prop({ required: true })
  borrower: string;

  @Prop({ required: true })
  stateOfTransaction: stateOfTransaction;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  period: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
