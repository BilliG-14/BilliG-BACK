import { Controller, Get, Post } from '@nestjs/common';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(readonly productService: ProductService) {}

  @Get()
  getProduct() {
    return this.productService.get();
  }

  @Post()
  createProduct(productInfo: CreateProductDTO) {
    return this.productService.create(productInfo);
  }
}
