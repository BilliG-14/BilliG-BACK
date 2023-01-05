import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReportDTO {
  @IsNotEmpty()
  @IsString()
  readonly target: string;

  @IsNotEmpty()
  @IsString()
  readonly details: string;
}
