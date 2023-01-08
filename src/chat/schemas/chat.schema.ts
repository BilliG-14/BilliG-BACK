import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaType } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export interface ChatInterface {
  name: string;
  message: string;
}

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({ type: SchemaType.Types.ObjectId, required: true, ref: User.name })
  host: string;

  @Prop({ type: SchemaType.Types.ObjectId, required: true, ref: User.name })
  guest: string;

  @Prop({ type: [{ name: String, message: String }], default: [] })
  chats?: ChatInterface[];

  @Prop({ type: [{ name: String, message: String }], default: [] })
  old_chats?: ChatInterface[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
