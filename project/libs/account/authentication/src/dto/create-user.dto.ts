import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsOptional, IsString, Length } from 'class-validator'

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'rs@gmail.com'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  email: string;

  @ApiProperty({
    description: 'User\'s last name and first name',
    example: 'R S',
  })
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @Length(6, 12)
  password: string;

  @ApiProperty({
    description: 'User avatar file id',
    example: '6581762309c030b503e30512',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  @IsString()
  avatar?: string;
}
