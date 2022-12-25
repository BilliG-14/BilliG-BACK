import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashtagModule } from 'src/hashtag/hashtag.module';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { Hashtag, HashtagSchema } from 'src/hashtag/schemas/hashtag.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, HashtagService],
})
export class ProductModule {}
