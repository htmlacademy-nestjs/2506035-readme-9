import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BlogPostRdo } from './blog-post.rdo';

export class BlogPostWithPaginationRdo {
  @ApiProperty({
    description: 'Posts list',
    example: ['Post', 'Post'],
    type: [BlogPostRdo],
  })
  @Expose()
  @Type(() => BlogPostRdo)
  public entities: BlogPostRdo[];

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
