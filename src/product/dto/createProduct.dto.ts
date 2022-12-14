import { IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly price: number;
}
