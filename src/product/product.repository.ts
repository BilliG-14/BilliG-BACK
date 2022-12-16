import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateProductDTO } from './dto/createProduct.dto';
import { productDTO } from './dto/product.dto';
import { updateProductDTO } from './dto/updateProduct.dto';
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

  // 게시물 대여타입 별로 불러오기
  async findByTypeOfPost(postType: postType) {
    const result = await this.productModel.find({ postType: postType });
    return result;
  }

  // 카테고리 별로 불러오기
  async findByCategory(category: string) {
    const result = await this.productModel.find({ category: category });
    return result;
  }

  async findByBorrower(user: string) {
    return await this.productModel.find({ borrower: user });
  }

  async findByLender(user: string) {
    return await this.productModel.find({ lender: user });
  }

  // 게시물 ID로 불러오기
  async findById(id: string) {
    const result = await this.productModel.find({ id: id });
    return result;
  }

  // 게시물 생성하기
  async createProduct(newProduct: productDTO) {
    const result = await this.productModel.create(newProduct);
    return result;
  }

  // 게시물 수정하기
  async updateProduct(productId: string, editProduct: updateProductDTO) {
    const result = await this.productModel.findOneAndUpdate(
      { productId },
      editProduct,
    );
    return result;
  }

  // 게시물 삭제하기
  async deleteProduct(productId: string) {
    const result = await this.productModel.findOneAndDelete({ productId });
    return result;
  }
}
