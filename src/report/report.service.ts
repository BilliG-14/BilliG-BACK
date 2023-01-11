import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Report, ReportDocument } from './schemas/report.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getMany() {
    const reports = await this.reportModel
      .find({})
      .populate('reporter target', 'name', User.name);
    return reports;
  }

  async getOne(_id: string) {
    const report = await this.reportModel
      .findOne({
        _id,
      })
      .populate('reporter target', 'name', User.name);
    return report;
  }

  async create(reportInfo: Report) {
    // 과거 신고 내역이 있는 지 확인
    const { reporter, target } = reportInfo;
    const targetUserInfo = await this.userModel
      .findOne({ _id: target })
      .populate('reports');
    if (
      targetUserInfo.reports.filter(
        async (report) =>
          (await this.reportModel.findOne({ id: report._id })).reporter ==
          reporter,
      ).length > 0
    ) {
      throw new HttpException(
        '이미 신고한 유저입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 처음신고하는거라면 신고 생성
    const thisReport = await this.reportModel.create(reportInfo);

    // 신고 당한 유저의 정보갱신 (신고내역, 정지여부)
    const beforeReports = targetUserInfo.reports;
    const suspensionThisTime = beforeReports.length >= 2;
    await this.userModel.findOneAndUpdate(
      { target },
      {
        reports: [...beforeReports, thisReport._id],
        suspension: suspensionThisTime,
      },
    );
    return thisReport;
  }

  async delete(_id: string) {
    await this.reportModel.deleteOne({
      _id,
    });
  }

  async getReportsByTarget(id: Types.ObjectId) {
    const reports = await this.reportModel
      .find({ target: id })
      .populate('reporter target', 'details createdAt', User.name);

    return reports;
  }
}
