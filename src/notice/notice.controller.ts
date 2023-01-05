import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
  async getNotices(@Query('per') per: number, @Query('page') page: number) {
    const notices = await this.noticeService.getNotices(per, page);
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
  @Patch(':id')
  async updateNotice(
    @Req() request,
    @Param('id') id: string,
    @Body() noticeInfo: UpdateNoticeDTO,
  ) {
    const notice = await this.noticeService.update(
      id,
      request.user._id,
      noticeInfo,
    );
    return notice;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteNotice(@Param('id') id: string) {
    await this.noticeService.delete(id);
  }
}
