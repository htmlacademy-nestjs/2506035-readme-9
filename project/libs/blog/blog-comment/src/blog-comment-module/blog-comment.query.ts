import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_COMMENT_COUNT_LIMIT, DEFAULT_PAGE_COUNT } from './blog-comment.constant';

export class BlogCommentQuery {
  @ApiProperty({
    description: 'Max items per page',
    required: false,
    default: DEFAULT_COMMENT_COUNT_LIMIT,
  })
  @Transform(({ value }) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_COMMENT_COUNT_LIMIT;

  @ApiProperty({
    description: 'Current page number',
    required: false,
    default: DEFAULT_PAGE_COUNT,
  })
  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
