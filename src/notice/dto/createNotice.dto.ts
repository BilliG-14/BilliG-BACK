import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoticeDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
