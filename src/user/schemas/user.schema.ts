import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Report } from 'src/report/schemas/report.schema';

export type UserDocument = HydratedDocument<User>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User {
  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  nickName: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  postalCode: string;

  @Prop({ type: String, required: true })
  address1: string;

  @Prop({ type: String, required: true })
  address2: string;

  @Prop({
    type: String,
    default:
      'https://billige.s3.ap-northeast-2.amazonaws.com/1671781855513_defaulUser.png',
  })
  image?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Report' })
  reports?: Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  suspension?: boolean;

  @Prop({ type: String, default: 'user', enum: ['user', 'admin'] })
  role?: string;

  @Prop({ type: String, default: '' })
  intro?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
