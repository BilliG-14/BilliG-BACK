import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaType } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

interface ChatInterface {
  name: string;
  message: string;
}

export type ChatDocument = HydratedDocument<Chat>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Chat {
  @Prop({ type: SchemaType.Types.ObjectId, required: true, ref: User.name })
  host: string;

  @Prop({ type: SchemaType.Types.ObjectId, required: true, ref: User.name })
  guest: string;

  @Prop({ type: [{ name: String, message: String }], default: [] })
  chats?: ChatInterface[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
