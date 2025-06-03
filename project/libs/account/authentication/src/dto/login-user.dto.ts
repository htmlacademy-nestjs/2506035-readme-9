import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'rs@gmail.com'
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  password: string;
}
