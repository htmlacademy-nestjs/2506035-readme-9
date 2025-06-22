import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment ID',
    example: 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Very interesting!',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Post ID',
    example: 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Created at',
  })
  @Expose()
  public createdAt: Date;
}
