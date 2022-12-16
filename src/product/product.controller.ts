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
import { UpdateProductDTO } from './dto/updateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(readonly productService: ProductService) {}

  //특정 유저의 모든 게시물 가져오기
  @Get() // product?user=XXXX
  async getUserAllProducts(@Query('user') user: string) {
    console.log('passed');
    return await this.productService.findUserAllProducts(user);
  }

  // 빌리기/빌려주기 로 구분하게 모든 게시물 가져오기
  @Get() //
  async getProducts(@Query('postType') postType: postType) {
    return await this.productService.findByTypeOfPost(postType);
  }

  // 특정 유저의 빌리기/빌려주기 별 게시물 가져오기
  @Get() // product?user=XXXX&postType=lend
  async getProductsByUser(
    @Query('user') user: string,
    @Query('postType') postType: postType,
  ) {
    console.log('passed');
    return await this.productService.findByUser(user, postType);
  }

  // 특정 게시물 정보 가져오기
  @Get('/:id') // product/12345
  async getProduct(@Param('id') productId: string) {
    return await this.productService.findOneProduct(productId);
  }

  // 게시물 포스팅하기
  @Post()
  async createProduct(@Body() body: CreateProductDTO) {
    return await this.productService.createProduct(body);
  }

  // 특정 게시물 수정하기
  @Patch('/:id')
  async patchProduct(
    @Param('id') productId: string,
    @Body() body: UpdateProductDTO,
  ) {
    return await this.productService.updateProduct(productId, body);
  }

  // 특정 게시물 삭제하기
  @Delete('/:id')
  async deleteProduct(@Param('id') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
