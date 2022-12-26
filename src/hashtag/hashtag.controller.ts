import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/schemas/product.schema';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  // 해시태그 인기순위 탐색하기
  @Get('popular')
  async getPopularHashtags(
    @Query('products') products: number,
    @Query('hashtags') hashtags: number,
  ) {
    return this.hashtagService.getPopularHashtags(products, hashtags);
  }
  // 해시태그 검색하기
  @Get()
  async getAllHashtags(@Query('per') per: number, @Query('page') page: number) {
    return await this.hashtagService.findHashtagsByPage(per, page);
  }
  // 해시태그 수정하기
  @Patch()
  async editHashtag(
    @Query('name') name: string,
    @Body('newName') newName: string,
    @Body('mentions') mentions: number,
  ) {
    const data = { newName, mentions };
    return await this.hashtagService.editHashtag(name, data);
  }

  @Post()
  async addHashtag() {
    // 개별 등록이 필요한가??
  }

  // 해시태그 삭제하기
  @Delete()
  async deleteHashtag() {
    // 모든 게시물에 해당 해시태그 삭제시키기 ??
    // 엄청오래 걸릴거 같은데
  }
}
