import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import { CreateReportDTO } from './dto/createReport.dto';
import { ReportService } from './report.service';

@UseGuards(JwtAuthGuard)
@Controller('report')
export class ReportController {
  constructor(readonly reportService: ReportService) {}

  @Get()
  async getReports() {
    const reports = await this.reportService.getMany();
    return reports;
  }

  @Get(':id')
  async getReport(@Param('id') id: string) {
    const report = await this.reportService.getOne(id);
    return report;
  }

  @Post()
  async createReport(@Req() request, @Body() reportInfo: CreateReportDTO) {
    const report = await this.reportService.create({
      details: reportInfo.details,
      reporter: request.user._id,
      target: new Types.ObjectId(reportInfo.target),
    });
    return report;
  }

  @Delete(':id')
  async deleteReport(@Param('id') id: string) {
    await this.reportService.delete(id);
  }
}
