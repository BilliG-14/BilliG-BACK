import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductRepository {
  //constructor(@InjectModel(Product.title) private productModel : Model<ProductDocument>)
}
