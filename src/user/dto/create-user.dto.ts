import {
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  // @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  // @MinLength(3, { message: 'Username must have at least 3 characters.' })
  username: string;
  //
  // @IsOptional()
  // @IsBoolean({ message: 'Allow display name must be a boolean' })
  // allow_display_name?: boolean;

  @IsNotEmpty()
  // @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsInt()
  age: number;

  @IsString()
  // @IsEnum(['f', 'm', 'u'])
  gender: string;

  @IsNotEmpty()
  password: string;
}
