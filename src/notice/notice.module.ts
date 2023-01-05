import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { Notice, NoticeSchema } from './schemas/notice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [NoticeController],
  providers: [NoticeService],
  exports: [NoticeService],
})
export class NoticeModule {}
