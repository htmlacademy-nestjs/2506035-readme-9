import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CommentRdo } from './comment.rdo';

export class BlogCommentWithPaginationRdo {
  @ApiProperty({
    description: 'Comments list',
    example: ['Very interesting!', 'Useful information.'],
    type: [CommentRdo],
  })
  @Expose()
  @Type(() => CommentRdo)
  public entities: CommentRdo[];

  @ApiProperty({
    description: 'Total pages count',
    example: 4,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Total items count',
    example: 40,
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: "Current page's number",
    example: 1,
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  @Expose()
  public itemsPerPage: number;
}
