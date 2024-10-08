import { UserDto } from '../../../user/dto';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({ example: '987fbc97-4bed-5078-9f07-9141ba07c9f3' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  roomId: string;

  @ApiProperty({ example: 'Hello, this is a message.' })
  text: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  to: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  from: string;

  @ApiProperty({ type: UserDto })
  creator: UserDto;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  createdBy: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  updatedBy: string;

  @ApiProperty({ example: '2023-01-02T00:00:00.000Z' })
  updated_at: Date;
}
