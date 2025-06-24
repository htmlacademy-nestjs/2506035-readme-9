import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { LinkContentDto, QuoteContentDto, TextContentDto, VideoContentDto } from '@project/blog-post';
import { PostType } from '@prisma/client';

@ApiExtraModels(
  LinkContentDto,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto
)
export class PostCreateDto {
  @ApiProperty({
    description: 'Post type',
    example: 'QUOTE',
  })
  public type: PostType;

  @ApiProperty({
    description: 'Tags array',
    example: ['html', 'css'],
    required: false,
  })
  public tags: string[];

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(LinkContentDto) },
      { $ref: getSchemaPath(QuoteContentDto) },
      { $ref: getSchemaPath(TextContentDto) },
      { $ref: getSchemaPath(VideoContentDto) },
    ],
    required: false,
    description: 'Post content',
  })
  public content: LinkContentDto | QuoteContentDto | TextContentDto | VideoContentDto | object;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Uploaded file',
    required: false,
  })
  public file?: Express.Multer.File;
}
