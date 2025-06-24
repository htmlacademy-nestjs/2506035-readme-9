import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsMongoId, IsOptional, IsString, Length, NotContains, Validate, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PostType } from '@prisma/client';
import { LinkContentDto, PhotoContentDto, QuoteContentDto, TextContentDto, VideoContentDto, BasePostContent } from './post-content.dto';
import { TagsValidator } from '../validators/tags.validator';

@ApiExtraModels(LinkContentDto, PhotoContentDto, QuoteContentDto, TextContentDto, VideoContentDto)
export class UpdatePostDto {
  @ApiProperty({
    description: 'User ID',
    example: '677e53ed7baca31a45997160',
  })
  @IsString()
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: `Post type, 1 of 5: ${PostType.LINK}, ${PostType.PHOTO}, ${PostType.QUOTE}, ${PostType.TEXT}, ${PostType.VIDEO}.`,
    example: 'TEXT',
    enum: PostType,
    enumName: 'PostType'
  })
  public type: PostType;

  @ApiProperty({
    description: 'Tags array',
    example: ['html', 'css'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(3, 10, { each: true })
  @NotContains(' ', { each: true })
  @Transform(({ value }) => value.map((item) => item.toLowerCase()))
  @Transform(({ value }) => Array.from(new Set(value)))
  @ArrayMaxSize(8)
  @Validate(TagsValidator, {
    message: 'The tag must start with a letter.',
  })
  public tags: string[];

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(LinkContentDto) },
      { $ref: getSchemaPath(PhotoContentDto) },
      { $ref: getSchemaPath(QuoteContentDto) },
      { $ref: getSchemaPath(TextContentDto) },
      { $ref: getSchemaPath(VideoContentDto) },
    ],
  })
  @ValidateNested()
  @Type(() => BasePostContent, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: LinkContentDto, name: PostType.LINK },
        { value: PhotoContentDto, name: PostType.PHOTO },
        { value: QuoteContentDto, name: PostType.QUOTE },
        { value: TextContentDto, name: PostType.TEXT },
        { value: VideoContentDto, name: PostType.VIDEO },
      ],
    },
  })
  public content: LinkContentDto | PhotoContentDto | QuoteContentDto | TextContentDto | VideoContentDto;
}
