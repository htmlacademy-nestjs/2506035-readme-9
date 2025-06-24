import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDetailsRdo {
  @ApiProperty({
    description: 'User ID',
    example: '6581762309c030b503e30512',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User unique email address',
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
    example: '/images/photo.jpg',
    required: false,
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'Number of subscribers',
    example: 123,
  })
  @Expose()
  public subscribersCount: number;

  @ApiProperty({
    description: 'Number of posts',
    example: 12,
  })
  @Expose()
  public postsCount: number;

  @ApiProperty({
    description: 'Registration date',
    example: '2025-05-31',
  })
  @Expose()
  public createdAt: string;
}
