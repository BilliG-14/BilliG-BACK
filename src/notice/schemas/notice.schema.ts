import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaType } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type NoticeDocument = HydratedDocument<Notice>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Notice {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: SchemaType.Types.ObjectId, required: true, ref: User.name })
  writer: SchemaType.Types.ObjectId;
}

const schema = SchemaFactory.createForClass(Notice);
schema.plugin(mongoosePaginate);
export const NoticeSchema = schema;
