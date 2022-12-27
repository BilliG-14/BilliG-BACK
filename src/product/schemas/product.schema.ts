import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { postType, stateOfTransaction } from '../types/state.type';
import * as mongoosePaginate from 'mongoose-paginate-v2';

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
const options: SchemaOptions = {
  timestamps: {
    currentTime: () => {
      const curr = new Date();
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
      const kr_curr = new Date(curr.getTime() + KR_TIME_DIFF);
      return kr_curr;
    },
  },
};

@Schema(options)
export class Product {
  @Prop({ required: false })
  postType: postType;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  imgUrl: string[];

  // 빌려주는사람, 빌리는사람 은 유저데이터와 populate 시켜야 함
  @Prop({ type: Types.ObjectId, ref: 'User' })
  lender: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  borrower: string;

  @Prop({ required: true })
  stateOfTransaction: stateOfTransaction;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, type: Object })
  price: object;

  @Prop({ required: true, type: Object })
  period: object;

  @Prop({ type: [Types.ObjectId], ref: 'Hashtag' })
  hashtag: string[];

  @Prop({ required: true, type: Object })
  tradeWay: object;
}

const schema = SchemaFactory.createForClass(Product);
schema.plugin(mongoosePaginate);
export const ProductSchema = schema;
