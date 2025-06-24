import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current user password',
    example: 'abc123',
  })
  @IsString()
  @Length(6, 12)
  currentPassword: string;

  @ApiProperty({
    description: 'New user password',
    example: 'abcd45',
  })
  @IsString()
  @Length(6, 12)
  newPassword: string;
}
