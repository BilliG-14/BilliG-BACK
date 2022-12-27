import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashtagModule } from 'src/hashtag/hashtag.module';
import { Hashtag, HashtagSchema } from 'src/hashtag/schemas/hashtag.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    HashtagModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
