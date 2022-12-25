import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { Hashtag, HashtagSchema } from './schemas/hashtag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hashtag.name, schema: HashtagSchema }]),
  ],
  controllers: [HashtagController],
  providers: [HashtagService, ProductService],
})
export class HashtagModule {}
