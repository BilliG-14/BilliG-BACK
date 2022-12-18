import { BadRequestException, Injectable, UploadedFiles } from '@nestjs/common';

@Injectable()
export class ImagesService {
  uploadImage(images: Array<Express.MulterS3.File>) {
    if (!images) {
      throw new BadRequestException(
        '이미지 저장을 시도하였으나, 첨부사진이 존재하지 않습니다.',
      );
    }

    const result = [];
    images.forEach((image) => result.push({ filePath: image.location }));

    return result;
  }
}
