import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type HashtagDocument = HydratedDocument<Hashtag>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Hashtag {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  mentions: number;
}

const schema = SchemaFactory.createForClass(Hashtag);
schema.plugin(mongoosePaginate);
export const HashtagSchema = schema;
