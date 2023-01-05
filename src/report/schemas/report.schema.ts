import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type ReportDocument = HydratedDocument<Report>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Report {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  reporter: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  target: Types.ObjectId;

  @Prop({ type: String, required: true })
  details: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
