import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  text: string;
}
