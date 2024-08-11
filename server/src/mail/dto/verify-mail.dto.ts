import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyMailDto {
  @IsString()
  @IsNotEmpty()
  firstName;

  @IsString()
  @IsNotEmpty()
  lastName;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email;

  @IsNotEmpty()
  otp;
}
