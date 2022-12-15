import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/createProduct.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>, // 스키마를 가져와서 모델링??
  ) {}

  async findByTypeOfPost() {
    return this.productModel.find({}).exec();
  }

  async findByOneProduct() {
    return this.productModel.find({}).exec();
  }

  async createBorrowingProduct(
    createProductDto: CreateProductDTO,
  ): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async createLendingProduct(
    createProductDto: CreateProductDTO,
  ): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }
}
