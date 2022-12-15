import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
