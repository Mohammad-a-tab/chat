import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    required: true,
    description: 'The username of the user',
    example: 'test90',
  })
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  @IsString()
  username: string;

  @ApiProperty({
    required: true,
    description: 'The email address of the user',
    example: 'example@example.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    description: 'The hashed password of the user',
    example: '$2a$10$abcdefghij1234567890',
  })
  @IsNotEmpty()
  @IsString()
  hashedPassword: string;
}
