import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator'

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'rs@gmail.com'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  email: string;

  @ApiProperty({
    description: 'User\'s last name and first name',
    example: 'R S',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User avatar url',
    example: 'avatar.jpg',
  })
  @IsString()
  avatar?: string;
}
