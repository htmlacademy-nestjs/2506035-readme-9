import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { BlogCommentValidateMessage } from '../blog-comment.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Very interesting!',
  })
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.TextIsEmpty })
  @Length(10, 300)
  public text: string;
}
