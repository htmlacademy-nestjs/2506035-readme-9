import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
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
    description: 'Access token',
    example: 'b2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  })
  @Expose()
  public accessToken: string;
}
