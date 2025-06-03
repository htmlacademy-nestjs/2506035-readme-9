import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'rs@gmail.com'
  })
  email: string;

  @ApiProperty({
    description: 'User\'s last name and first name',
    example: 'R S',
  })
  name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  password: string;

  @ApiProperty({
    description: 'User avatar url',
    example: 'avatar.jpg',
  })
  avatar?: string;
}
