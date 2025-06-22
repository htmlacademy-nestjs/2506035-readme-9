import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/client';
import { IsMongoId, IsOptional, IsString, IsUrl, Length, Matches, MaxLength } from 'class-validator';

const YOUTUBE_REGEXP = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export class BasePostContent {
  type: PostType;
}

export class LinkContentDto extends BasePostContent {
  @ApiProperty({
    description: 'Link (valid URL).',
    example: 'https://htmlacademy.ru/intensive/nodejs-2',
  })
  @IsUrl()
  public url: string;

  @ApiProperty({
    description: 'Description of the link.',
    example: 'Node.js и Nest.js. Микросервисная архитектура',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  public description?: string;
}

export class PhotoContentDto extends BasePostContent {
  @ApiProperty({
    description: 'Uploaded photo file id',
    example: '6581762309c030b503e30512',
  })
  @IsMongoId()
  public photoId: string;
}

export class QuoteContentDto extends BasePostContent {
  @ApiProperty({
    description: 'Quote text.',
    example: 'What you seek is also seeking you.',
  })
  @IsString()
  @Length(20, 300)
  public quote: string;

  @ApiProperty({
    description: 'Quote author.',
    example: 'Rumi',
  })
  @IsString()
  @Length(3, 50)
  public author: string;
}

export class TextContentDto extends BasePostContent {
  @ApiProperty({
    description: 'Title.',
    example: 'Микросервисная архитектура.',
  })
  @IsString()
  @Length(20, 50)
  public title: string;

  @ApiProperty({
    description: 'Post announcement.',
    example: 'Курс разработан для тех, кто хочет сменить профессию и стать высокооплачиваемым профессионалом. Он подойдёт для работающих людей, у которых мало времени.',
  })
  @IsString()
  @Length(50, 255)
  public announcement: string;

  @ApiProperty({
    description: 'Post text.',
    example: 'На этом курсе вы научитесь делать настоящие проекты, такие же по уровню сложности, как в индустрии. И будете делать их правильно, чтобы после обучения выдавать результат высокого уровня, за который компании готовы платить.',
  })
  @IsString()
  @Length(100, 1024)
  public text: string;
}

export class VideoContentDto extends BasePostContent {
  @ApiProperty({
    description: 'Title.',
    example: 'Микросервисная архитектура.',
  })
  @IsString()
  @Length(20, 50)
  public title: string;

  @ApiProperty({
    description: 'Link to YouTube video.',
    example: 'https://www.youtube.com/watch?v=KWZdfMLMupY',
  })
  @IsUrl()
  @Matches(YOUTUBE_REGEXP)
  public url: string;
}
