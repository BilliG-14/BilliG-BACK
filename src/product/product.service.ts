import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { postType } from './types/state.type';
import { Product, ProductDocument } from './schemas/product.schema';
import { paginate } from 'mongoose-paginate-v2';
import { find } from 'rxjs';
import { HashtagService } from 'src/hashtag/hashtag.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: PaginateModel<ProductDocument>,
    private hashtagService: HashtagService,
  ) {}

  async findProducts(query) {
    console.dir(query);
    return await this.productModel.find(query);
  }

  async findProductsByPage(per, page, filter) {
    return await this.productModel.paginate(filter, {
      sort: { createdAt: -1 },
      limit: per,
      page,
    });
  }

  async findOneProduct(id: string) {
    const result = await this.productModel
      .find({ _id: id })
      .populate(['category', 'author', 'lender', 'borrower']);
    return result;
  }

  // 게시물 생성
  async createProduct(createProduct: CreateProductDTO): Promise<Product> {
    const {
      postType,
      category,
      author,
      title,
      description,
      imgUrl,
      lender,
      borrower,
      stateOfTransaction,
      address,
      price,
      period,
      hashtag,
      tradeWay,
    } = createProduct;

    // hashtag 검색 후 등록
    const hashtagIds = hashtag.map((tag) =>
      this.hashtagService.useHashtag(tag),
    );

    const inputProduct = {
      postType,
      category,
      author,
      title,
      description,
      ...(imgUrl && { imgUrl }),
      ...(lender && { lender }),
      ...(borrower && { borrower }),
      stateOfTransaction,
      address,
      price,
      period,
      hashtag: hashtagIds,
      tradeWay,
    };
    const result = await this.productModel.create(inputProduct);
    return result;
  }

  // 게시물 수정
  async updateProduct(id: string, editproduct: UpdateProductDTO) {
    const {
      postType,
      category,
      author,
      title,
      description,
      imgUrl,
      lender,
      borrower,
      stateOfTransaction,
      address,
      price,
      period,
      hashtag,
      tradeWay,
    } = editproduct;

    const targetProduct = await this.productModel.findOne({ _id: id });
    const targetHashtags = targetProduct.hashtag;
    targetHashtags.forEach((tag) => this.hashtagService.notUseHashtag(tag));

    const hashtagIds = hashtag.map((tag) =>
      this.hashtagService.useHashtag(tag),
    );

    const inputProduct = {
      ...(postType && { postType }),
      ...(category && { category }),
      ...(author && { author }),
      ...(title && { title }),
      ...(description && { description }),
      ...(imgUrl && { imgUrl }),
      ...(lender && { lender }),
      ...(borrower && { borrower }),
      ...(stateOfTransaction && { stateOfTransaction }),
      ...(address && { address }),
      ...(price && { price }),
      ...(period && { period }),
      ...(hashtag && { hashtagIds }),
      ...(tradeWay && { tradeWay }),
    };
    const result = await this.productModel.findOneAndUpdate(
      { _id: id },
      inputProduct,
      { returnDocument: 'after', returnNewDocument: true },
    );
    return result;
  }

  async deleteProduct(id: string) {
    const result = await this.productModel.findOneAndDelete({ _id: id });
    return result;
  }
}
