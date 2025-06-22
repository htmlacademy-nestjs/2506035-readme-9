import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BlogPostContentRdo {
  @ApiProperty({
    description: 'Link (valid URL).',
    example: 'https://htmlacademy.ru/intensive/nodejs-2',
    required: false,
  })
  @Expose()
  public url: string;

  @ApiProperty({
    description: 'Description of the link.',
    example: 'Node.js и Nest.js. Микросервисная архитектура',
    required: false,
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Uploaded photo file id',
    example: '6581762309c030b503e30512',
    required: false,
  })
  @Expose()
  public photoId: string;

  @ApiProperty({
    description: 'Quote text.',
    example: 'What you seek is also seeking you.',
    required: false,
  })
  @Expose()
  public quote: string;

  @ApiProperty({
    description: 'Quote author.',
    example: 'Rumi',
    required: false,
  })
  @Expose()
  public author: string;

  @ApiProperty({
    description: 'Title.',
    example: 'Микросервисная архитектура.',
    required: false,
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Post announcement.',
    example: 'Курс разработан для тех, кто хочет сменить профессию и стать высокооплачиваемым профессионалом. Он подойдёт для работающих людей, у которых мало времени.',
    required: false,
  })
  @Expose()
  public announcement: string;

  @ApiProperty({
    description: 'Post text.',
    example: 'На этом курсе вы научитесь делать настоящие проекты, такие же по уровню сложности, как в индустрии. И будете делать их правильно, чтобы после обучения выдавать результат высокого уровня, за который компании готовы платить.',
    required: false,
  })
  @Expose()
  public text: string;
}
