import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    //class-validation 을 사용하기 위한 등록
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      forbidUnknownValues: false,
    }),
  );

  app.use(cookieParser());
  app.enableCors({ credentials: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
