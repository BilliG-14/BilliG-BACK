import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import { CreateNoticeDTO } from './dto/createNotice.dto';
import { UpdateNoticeDTO } from './dto/updateNotice.dto';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(readonly noticeService: NoticeService) {}

  @Get()
  async getNotices() {
    const notices = await this.noticeService.getNotices();
    return notices;
  }

  @Get(':id')
  async getNotice(@Param('id') id: string) {
    const notice = await this.noticeService.getNoticeById(id);
    return notice;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNotice(@Req() request, @Body() noticeInfo: CreateNoticeDTO) {
    const notice = await this.noticeService.create({
      ...noticeInfo,
      writer: request.user._id,
    });
    return notice;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateNotice(@Req() request, @Body() noticeInfo: UpdateNoticeDTO) {
    const notice = await this.noticeService.update(
      request.user._id,
      noticeInfo,
    );
    return notice;
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteNotice(@Body() { id }: { id: string }) {
    await this.noticeService.delete(id);
  }
}
