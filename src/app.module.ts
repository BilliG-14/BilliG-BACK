import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    NoticeModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
