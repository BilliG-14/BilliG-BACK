import { IsOptional, IsString } from 'class-validator';

export class UpdateNoticeDTO {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly content?: string;
}
