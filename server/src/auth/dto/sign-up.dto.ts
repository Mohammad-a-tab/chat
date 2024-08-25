import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
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
    example: 'test80',
  })
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  @IsString()
  username: string;

  @ApiProperty({
    required: true,
    description: 'The bio of the user',
    example: 'test80',
  })
  @MinLength(3, { message: 'Bio must have at least 3 characters.' })
  @IsString()
  bio: string;

  @ApiProperty({
    required: true,
    description: 'The mail address of the user',
    example: 'john@example.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    description: 'The user password (at least 8 characters)',
    example: 'mypassword123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
