import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { postType } from './types/state.type';
import { ProductModule } from './product.module';
import {
  Product,
  ProductDocument,
  ProductSchema,
} from './schemas/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findProducts(body) {
    return this.productModel.find({ body });
  }

  // // 게시물 대여타입 별로 불러오기
  // async findByTypeOfPost(postType: postType) {
  //   const result = await this.productModel
  //     .find({ postType: postType })
  //     .populate('category');
  //   return result;
  // }

  // // 카테고리 별로 불러오기
  // async findByCategory(category: string) {
  //   const result = await this.productModel
  //     .find({ category: category })
  //     .populate('category');
  //   return result;
  // }

  // // 빌려주는 사람으로 찾기
  // async findByLender(user: string) {
  //   return await this.productModel.find({ lender: user }).populate('category');
  // }

  // // 빌리는 사람으로 찾기
  // async findByBorrower(user: string) {
  //   return await this.productModel
  //     .find({ borrower: user })
  //     .populate('category');
  // }

  // 게시물 ID로 불러오기
  async findById(productId: string) {
    const result = await this.productModel
      .find({ _id: productId })
      .populate('category');
    return result;
  }

  // 게시물 생성하기
  async createProduct(newProduct: CreateProductDTO) {
    const result = await this.productModel.create(newProduct);
    return result;
  }

  // 게시물 수정하기
  async updateProduct(productId: string, editProduct: UpdateProductDTO) {
    const result = await this.productModel.findOneAndUpdate(
      { _id: productId },
      editProduct,
      { returnDocument: 'after', returnNewDocument: true },
    );
    return result;
  }

  // 게시물 삭제하기
  async deleteProduct(productId: string) {
    const result = await this.productModel.findOneAndDelete({ _id: productId });
    return result;
  }
}
