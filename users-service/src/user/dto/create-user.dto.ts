import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user_47',
    description: 'username',
    required: true,
    uniqueItems: true,
  })
  @IsString({ message: 'Username must be a string' })
  readonly username: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Email address',
    required: true,
    format: 'email',
    uniqueItems: true,
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsString({ message: 'Email must be a string' })
  readonly email: string;

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
