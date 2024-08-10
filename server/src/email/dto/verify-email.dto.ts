import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
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
