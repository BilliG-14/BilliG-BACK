import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/createProduct.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  get() {
    return this.productModel.find({});
  }

  create(productInfo: CreateProductDTO) {
    const createdProduct = new this.productModel(productInfo);
    return createdProduct.save();
  }
}
