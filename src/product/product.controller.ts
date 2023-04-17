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
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

@Controller('product')
export class ProductController {
  constructor(
    readonly productService: ProductService,
    private readonly configService: ConfigService,
  ) {}

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
        s3: new S3Client({
          region: process.env.AWS_BUCKET_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        }),
        bucket: process.env.AWS_S3_BUCKET_NAME,
        key(_req, file, done) {
          const ext = path.extname(file.originalname); //확장자
          const basename = path.basename(file.originalname, ext); //파일명
          // 파일 이름을 : '날짜_파일이름.확장자' 형식으로 설정.
          done(null, `${Date.now()}_${basename}${ext}`);
        },
      }),
      limits: {}, //  fileSize: 10 * 1024 * 1024     10MB
    }),
  )
  async createProduct(
    @Body() body: InputProductDTO,
    @UploadedFiles() images: Array<Express.MulterS3.File>,
  ) {
    const result = [];
    if (!images.length) {
      //result.push(process.env.PRODUCT_DEFAULT_IMAGE);
      result.push(
        'https://billige.s3.ap-northeast-2.amazonaws.com/product_default.png',
      );
    }
    const inputData = JSON.parse(body.data);
    images.forEach((image) => result.push(image.location));

    return await this.productService.createProduct({
      ...inputData,
      imgUrl: result,
    });
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
