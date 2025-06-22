import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';
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

  @ApiProperty({
    description: 'The uniq user ID',
    example: '6581762309c030b503e30512',
  })
  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidID })
  public userId: string;
}
