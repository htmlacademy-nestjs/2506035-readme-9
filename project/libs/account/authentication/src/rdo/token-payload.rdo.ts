import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadRdo {
  @ApiProperty({
    description: 'User ID',
    example: '6581762309c030b503e30512',
  })
  @Expose()
  public sub: string;

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
}
