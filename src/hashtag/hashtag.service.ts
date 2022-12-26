import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { throws } from 'assert';
import { PaginateModel } from 'mongoose';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';
import { Hashtag, HashtagDocument } from './schemas/hashtag.schema';

@Injectable()
export class HashtagService {
  constructor(
    @InjectModel(Hashtag.name)
    private readonly hashtagModel: PaginateModel<HashtagDocument>,
    @InjectModel(Product.name)
    private readonly productModel: PaginateModel<ProductDocument>,
  ) {}

  // 단순 해시태그 검색
  async findHashtag(name: string) {
    const registeredTag = await this.hashtagModel.findOne({ name });
    try {
      if (registeredTag._id) {
        return registeredTag._id;
      } else {
        throw Error('해당 해시태그가 존재하지 않습니다.');
      }
    } catch (e) {
      return e.message;
    }
  }

  // 해시태그 리스트 페이지 단위 검색
  async findHashtagsByPage(per: number, page: number) {
    return await this.hashtagModel.paginate(
      {},
      {
        sort: { createdAt: -1 },
        limit: per,
        page,
      },
    );
  }

  // 게시글 등록 시 해시태그 반영
  async useHashtag(name: string) {
    // 해시태그 검색해서 objectid 반환,
    // 해당 해시태그 사용 수++
    // 없으면 크리에이트 해시태그
    // 생성된 해시태그 objectid 반환
    // 따라서 게시글 등록 시 해시태그가 모두 objectid로 저장되도록 설정
    const hashtag = await this.hashtagModel.findOne({ name });
    if (hashtag) {
      await this.hashtagModel.findOneAndUpdate(
        { name },
        { mentions: hashtag.mentions + 1 },
      );
      return hashtag._id;
    } else {
      const newHashtag = await this.hashtagModel.create({
        name: name,
        mentions: 1,
      });
      return newHashtag._id;
    }
  }

  async notUseHashtag(name: string) {
    console.log(name);
    const hashtag = await this.hashtagModel.findOne({ name });
    const unUseHashtag = await this.hashtagModel.findOneAndUpdate(
      { name },
      { mentions: hashtag.mentions - 1 },
    );
    return unUseHashtag;
  }

  // 인기 해시태그 모아보기
  async getPopularHashtags(products: number, hashtags: number) {
    const productList = (
      await this.productModel.paginate(
        {},
        {
          sort: { createdAt: -1 },
          limit: products,
          page: 1,
        },
      )
    ).docs;
    const hashtagList = productList
      .map((product) => {
        return product.hashtag;
      })
      .flat();
    const hashtagSet = [...new Set(hashtagList)];
    const foundTags = await Promise.all(
      hashtagSet.map(async (tag_id) => {
        return await this.hashtagModel.findOne({ _id: tag_id });
      }),
    );
    const popularHashtags = foundTags.sort((a, b) => b.mentions - a.mentions);
    const result = [];
    for (
      let i = 0;
      i <
      (hashtags < popularHashtags.length ? hashtags : popularHashtags.length);
      i++
    ) {
      result.push(popularHashtags[i]);
    }
    return result;
  }

  // 해시태그 수정
  async editHashtag(name: string, data: object) {
    const hashtag = await this.hashtagModel.findOneAndUpdate({ name }, data, {
      returnDocument: 'after',
      returnNewDocument: true,
    });
    return hashtag;
  }
}
