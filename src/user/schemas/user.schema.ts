import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

  @Prop({ type: String, default: '' })
  image?: string;

  @Prop({ type: Boolean, default: false })
  suspension?: boolean;

  @Prop({ type: String, default: 'user', enum: ['user', 'admin'] })
  role?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
