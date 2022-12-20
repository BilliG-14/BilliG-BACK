import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Report, ReportDocument } from './schemas/report.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
  ) {}

  async getMany() {
    const reports = await this.reportModel
      .find({})
      .populate(['reporter', 'target'], 'name', Report.name);
    return reports;
  }

  async getOne(_id: string) {
    const report = await this.reportModel
      .findOne({
        _id,
      })
      .populate(['reporter', 'target'], 'name', Report.name);
    return report;
  }

  async create(reportInfo: Report) {
    const report = await this.reportModel.create(reportInfo);
    return report;
  }

  async delete(_id: string) {
    await this.reportModel.deleteOne({
      _id,
    });
  }

  async getReportsByTarget(id: Types.ObjectId) {
    const reports = await this.reportModel
      .find({ target: id })
      .populate(['reporter', 'target'], 'details createdAt', Report.name);

    return reports;
  }
}
