import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PostType, PostStatus } from '@prisma/client';
import { BlogPostContentRdo } from './blog-post-content.rdo';

export class BlogPostRdo {
  @ApiProperty({
    description: 'Post ID',
    example: 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: `Post type, 1 of 5: ${PostType.LINK}, ${PostType.PHOTO}, ${PostType.QUOTE}, ${PostType.TEXT}, ${PostType.VIDEO}.`,
    example: PostType.QUOTE,
    enum: PostType,
    enumName: 'PostType'
  })
  @Expose()
  public type: PostType;

  @ApiProperty({
    type: BlogPostContentRdo,
    description: 'Post content',
    example: {
      quote: 'What you seek is also seeking you.',
      author: 'Rumi'
    },
  })
  @Expose()
  @Type(() => BlogPostContentRdo)
  public content: BlogPostContentRdo;

  @ApiProperty({
    description: 'Tags array',
    example: ['html', 'css'],
    required: false,
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Comments count',
    example: '64',
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Likes count',
    example: '25',
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: `Post status: ${PostStatus.DRAFT} or ${PostStatus.PUBLISHED}.`,
    example: PostStatus.PUBLISHED,
    enum: PostStatus,
    enumName: 'PostStatus'
  })
  @Expose()
  public status: PostStatus;

  @ApiProperty({
    description: 'The uniq user ID',
    example: 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2025-06-01T05:53:11',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Repost flag',
    example: false,
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: 'Reposted publication ID.',
    example: 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd',
  })
  @Expose()
  originalPostId: string;

  @ApiProperty({
    description: 'Reposted publication author ID.',
    example: 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd',
  })
  @Expose()
  originalAuthorId: string;
}
