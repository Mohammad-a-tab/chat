import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CheckOtpDto {
  @ApiProperty({
    required: true,
    description: 'Otp for send email',
    example: 'test@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    description: 'coed for otp',
    example: '123456',
  })
  // @IsString()
  // @IsNotEmpty()
  code: string;
}
