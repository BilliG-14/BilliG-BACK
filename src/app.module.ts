import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { NoticeModule } from './notice/notice.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ReportModule } from './report/report.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ChatModule } from './chat/chat.module';

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
    CategoryModule,
    ReportModule,
    HashtagModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
