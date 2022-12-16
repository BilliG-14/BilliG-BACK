import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/createProduct.dto';
import { postType } from './types/state.type';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { updateProductDTO } from './dto/updateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(readonly productService: ProductService) {}

  // GET
  // 빌려주는 모든상품 가져오기
  // 빌리는 모든 상품 가져오기
  // 특정 상품 자세히 보기

  //POST
  // 빌려주는 상품 등록하기 (수여자 공백)
  // 빌리는 상품 등록하기 (대여자 공백)

  //Patch
  // 빌려주는 상품 거래하기 (대여자 추가)
  // 빌리는 상품 거래하기 (수령자 추가)
  // 상품 대여/수령하기
  // 상품 반납/회수하기

  //Delete
  // 게시물 삭제하기

  // product/filter?postType="borrow"
  @Get('filter')
  async getProducts(@Query('postType') postType: postType) {
    return await this.productService.findByTypeOfPost(postType);
  }

  @Get('filter')
  async getProductsByUser(
    @Query('user') user: string,
    @Query('postType') postType: postType,
  ) {
    return await this.productService.findByUser(user, postType);
  }

  // product/12345
  @Get('/:id')
  async getProduct(@Param('id') productId: string) {
    return await this.productService.findOneProduct(productId);
  }

  // product
  @Post()
  async createProduct(@Body() body: CreateProductDTO) {
    return await this.productService.createProduct(body);
  }

  @Patch('/:id')
  async patchProduct(
    @Param('id') productId: string,
    @Body() body: updateProductDTO,
  ) {
    return await this.productService.updateProduct(productId, body);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
