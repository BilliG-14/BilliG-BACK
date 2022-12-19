import { IsObject, IsString } from 'class-validator';

export class InputProductDTO {
  @IsString()
  data: string;
}
