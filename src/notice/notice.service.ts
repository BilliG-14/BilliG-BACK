import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UpdateNoticeDTO } from './dto/updateNotice.dto';
import { Notice, NoticeDocument } from './schemas/notice.schema';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name)
    private noticeModel: PaginateModel<NoticeDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getNotices(per: number, page: number) {
    const notices = await this.noticeModel.paginate(
      {},
      {
        sort: { createdAt: -1 },
        populate: ['writer'],
        limit: per,
        page,
      },
    );
    return notices;
  }

  async getNoticeById(_id: string) {
    const notice = await this.noticeModel
      .findOne({ _id }, {}, { returnOriginal: false })
      .populate('writer', 'name nickName', User.name);
    return notice;
  }

  async create(noticeInfo: Notice) {
    const { writer } = noticeInfo;
    const user = await this.userModel.findOne(
      { _id: writer },
      { password: false },
    );
    if (user.role == 'admin') {
      const notice = new this.noticeModel(noticeInfo);
      return notice.save();
    } else {
      return '글 작성 권한이 없습니다.';
    }
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
