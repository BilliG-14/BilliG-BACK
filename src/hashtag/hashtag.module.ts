import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { Product, ProductSchema } from 'src/product/schemas/product.schema';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { Hashtag, HashtagSchema } from './schemas/hashtag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hashtag.name, schema: HashtagSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [HashtagController],
  providers: [HashtagService],
  exports: [HashtagService],
})
export class HashtagModule {}
