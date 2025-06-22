import { ApiProperty } from '@nestjs/swagger';

export class CommentCreateDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Very interesting!',
  })
  public text: string;
}
