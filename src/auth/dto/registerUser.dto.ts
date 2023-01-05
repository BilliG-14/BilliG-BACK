import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly nickName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly postalCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly address1: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly address2: string;
}
