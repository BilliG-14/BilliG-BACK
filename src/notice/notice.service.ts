import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { UpdateNoticeDTO } from './dto/updateNotice.dto';
import { Notice, NoticeDocument } from './schemas/notice.schema';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
  ) {}

  async getNotices() {
    const notices = await this.noticeModel
      .find({}, { content: false }, { returnOriginal: false })
      .populate('writer', 'name nickName', User.name);
    return notices;
  }

  async getNoticeById(_id: string) {
    const notice = await this.noticeModel
      .findOne({ _id }, {}, { returnOriginal: false })
      .populate('writer', 'name nickName', User.name);
    return notice;
  }

  async create(noticeInfo: Notice) {
    const notice = new this.noticeModel(noticeInfo);
    return notice.save();
  }

  async update(noticeId: string, userId: string, noticeInfo: UpdateNoticeDTO) {
    const notice = await this.noticeModel
      .findOneAndUpdate({ _id: noticeId, writer: userId }, noticeInfo, {
        returnOriginal: false,
      })
      .populate('writer', 'name nickName', User.name);

    if (!notice) {
      throw new HttpException(
        '작성자가 수정할 수 있습니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    return notice;
  }

  async delete(_id: string) {
    await this.noticeModel.deleteOne({ _id });
  }
}
