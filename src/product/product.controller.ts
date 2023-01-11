import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/createProduct.dto';
import { postType } from './types/state.type';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';
import { FindProductDTO } from './dto/findProduct.dto';
import { parse } from 'path';
import { InputProductDTO } from './dto/inputProduct.dto';
import * as qs from 'qs';

const s3 = new S3Client({
  region: 'ap-northeast-2', // 환경변수로 선언하면 값을 못 읽어오는 문제 있음. 왜 ?????
  credentials: {
    accessKeyId: 'AKIAY5IXVITKPDRY6G4T', // 환경변수로 선언하면 값을 못 읽어오는 문제 있음. 왜 ?????
    secretAccessKey: 'RYTV+DplWnGZJ/aTC9RXmFlYKknkr7ixri4S+yfl', // 환경변수로 선언하면 값을 못 읽어오는 문제 있음. 왜 ?????
  },
});

@Controller('product')
export class ProductController {
  constructor(readonly productService: ProductService) {}

  @Get('page') // product?user=XXXX&postType=lend
  async getProductsByPage(
    // @Query('per') per: number,
    // @Query('page') page: number,
    @Req() req,
    //@Query() query: FindProductDTO,
  ) {
    const queries = qs.parse(req.query);
    const { per, page, ...filter } = queries;
    return await this.productService.findProductsByPage(per, page, filter);
  }

  //게시물 가져오기 (유저별 / 게시물 타입 별)
  @Get() // product?user=XXXX&postType=lend
  async getProducts(@Query() query: FindProductDTO) {
    return await this.productService.findProducts(query);
  }

  // 특정 게시물 정보 가져오기
  @Get('/:id') // product/12345
  async getProduct(@Param('id') productId: string) {
    return await this.productService.findOneProduct(productId);
  }

  // 게시물 포스팅하기

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multerS3({
        s3: s3,
        bucket: 'billige',
        key(_req, file, saveFile) {
          const namedExtension = path.extname(file.originalname); //확장자
          const namedFile = path.basename(file.originalname, namedExtension); //파일명
          // 파일 이름을 : '날짜_파일이름.확장자' 형식으로 설정.
          saveFile(null, `${Date.now()}_${namedFile}${namedExtension}`);
        },
      }),
      limits: {}, //  fileSize: 10 * 1024 * 1024     10MB
    }),
  )
  async createProduct(
    @Body() body: InputProductDTO,
    @UploadedFiles() images: Array<Express.MulterS3.File>,
  ) {
    //
    const result = [];
    if (!images.length) {
      //result.push(process.env.PRODUCT_DEFAULT_IMAGE);
      result.push(
        'https://billige.s3.ap-northeast-2.amazonaws.com/product_default.png',
      );
    }
    //
    const inputData = JSON.parse(body.data);
    //
    images.forEach((image) => result.push(image.location));
    //
    return await this.productService.createProduct({
      ...inputData,
      imgUrl: result,
    });
  }

  // 인풋을 받아서 포스팅하는 함수
  // 이미지가 있는지 확인하는 함수
  // 이미지를 받아서 이미지주소를 넣을 배열에 하나씩 대입하는 함수

  isThereImgs(images) {
    return !images.length ? true : false;
  }

  inputImagesToArray(images) {
    this.isThereImgs(images);
  }

  // 특정 게시물 수정하기
  @Patch('/:id')
  async patchProduct(
    @Param('id') productId: string,
    @Body() body: UpdateProductDTO,
  ) {
    const patchedProduct = await this.productService.updateProduct(
      productId,
      body,
    );
    return patchedProduct;
  }

  // 특정 게시물 삭제하기
  @Delete('/:id')
  async deleteProduct(@Param('id') productId: string) {
    const deletedProduct = await this.productService.deleteProduct(productId);
    return deletedProduct;
  }
}
