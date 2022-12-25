import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { postType } from './types/state.type';
import { Product, ProductDocument } from './schemas/product.schema';
import { paginate } from 'mongoose-paginate-v2';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: PaginateModel<ProductDocument>,
  ) {}

  async findProducts(query) {
    console.dir(query);
    return await this.productModel.find(query);
  }

  async findProductsByPage(per, page, filter) {
    let { stateOfTransaction, ...rest } = filter;
    if (stateOfTransaction) {
      stateOfTransaction = parseInt(stateOfTransaction);
      console.log(typeof stateOfTransaction);
      filter = { stateOfTransaction, ...rest };
    }
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
      hashtag,
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
      ...(hashtag && { hashtag }),
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
