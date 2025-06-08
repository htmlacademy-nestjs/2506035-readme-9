import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'elr664c3-bdf3-4fb3-b8f3-42e007864bbf',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'rs@gmail.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User\'s last name and first name',
    example: 'R S',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User avatar url',
    example: 'avatar.jpg',
  })
  @Expose()
  public avatar?: string;
}
