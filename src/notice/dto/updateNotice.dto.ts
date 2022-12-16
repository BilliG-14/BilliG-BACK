import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNoticeDTO {
  @IsNotEmpty()
  @IsString()
  readonly id?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly content?: string;
}
