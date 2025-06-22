import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '6581762309c030b503e30512',
  })
  @IsMongoId()
  userId: string;
}
