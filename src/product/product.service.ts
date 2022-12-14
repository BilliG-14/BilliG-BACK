import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
  get() {
    return;
  }

  create(productInfo: CreateProductDTO) {
    return productInfo;
  }
}
