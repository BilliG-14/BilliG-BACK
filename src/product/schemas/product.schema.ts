import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { postType, stateOfTransaction } from '../types/state.type';

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
  @Prop({ required: false })
  postType: postType;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  contents: string;

  @Prop({ required: false })
  imgUrl: string[];

  // 빌려주는사람, 빌리는사람 은 유저데이터와 populate 시켜야 함
  @Prop({ required: false })
  lender: string;

  @Prop({ required: false })
  borrower: string;

  @Prop({ required: true })
  stateOfTransaction: stateOfTransaction;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  period: string;

  @Prop({ required: true })
  hashtag: string[];

  @Prop({ required: true })
  delivery: boolean;

  @Prop({ required: true })
  direct: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
