import { S3, S3Client } from '@aws-sdk/client-s3';
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import { ImagesService } from './images.service';

const s3 = new S3Client({
  region: 'ap-northeast-2', // 환경변수로 선언하면 값을 못 읽어오는 문제 있음. 왜 ?????
  credentials: {
    accessKeyId: 'AKIAY5IXVITKPDRY6G4T', // 환경변수로 선언하면 값을 못 읽어오는 문제 있음. 왜 ?????
    secretAccessKey: 'RYTV+DplWnGZJ/aTC9RXmFlYKknkr7ixri4S+yfl', // 환경변수로 선언하면 값을 못 읽어오는 문제 있음. 왜 ?????
  },
});

@Controller('images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multerS3({
        s3: s3,
        bucket: 'billige',
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
  async uploadImage(@UploadedFiles() files: Array<Express.MulterS3.File>) {
    return this.imageService.uploadImage(files);
  }
}
