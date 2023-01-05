import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly nickName?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly phoneNumber?: string;

  @IsOptional()
  @IsString()
  readonly postalCode?: string;

  @IsOptional()
  @IsString()
  readonly address1?: string;

  @IsOptional()
  @IsString()
  readonly address2?: string;

  @IsOptional()
  @IsBoolean()
  readonly suspension?: boolean;

  @IsOptional()
  @IsString()
  readonly image?: string;

  @IsOptional()
  @IsString()
  readonly intro?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;
}
