import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'user_47',
    description: 'username',
    required: true,
    uniqueItems: true,
  })
  @IsString({ message: 'Username must be a string' })
  readonly username: string;

  @ApiProperty({
    example: '123456',
    description: 'Password',
    required: true,
    format: 'password',
  })
  @IsString({ message: 'Password must be a string' })
  @Length(4, 16, { message: 'Password must be between 4 and 16 characters' })
  readonly password: string;
}
