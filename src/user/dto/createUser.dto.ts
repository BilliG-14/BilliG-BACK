import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly id: string;

  @IsString()
  readonly password: string;
}
