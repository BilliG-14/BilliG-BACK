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
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

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
  getBorrowingProducts(@Query('postType') postType: string) {
    switch (postType) {
      case 'borrow':
      case 'lend':
    }
  }

  // product/12345
  @Get('/:id')
  getProduct(@Param('id') productId: number) {
    return 'find one product';
  }

  // product/filter?postType="borrow"
  @Post()
  createProduct(
    @Query('postType') postType: string,
    @Body() body: CreateProductDTO,
  ) {
    switch (postType) {
      case 'borrow':
      case 'lend':
    }
  }

  @Patch()
  patchBorrowingProduct() {}

  @Patch()
  patchLendingProduct() {}

  @Delete(':id')
  deleteProduct() {}
}
