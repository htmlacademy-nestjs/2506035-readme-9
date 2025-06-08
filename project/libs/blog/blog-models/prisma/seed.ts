import { PrismaClient } from '@prisma/client';

export enum PostType {
  Link = 'LINK',
  Photo = 'PHOTO',
  Quote = 'QUOTE',
  Text = 'TEXT',
  Video = 'VIDEO',
}

const FIRST_TAG_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_TAG_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getTags() {
  return [
    { id: FIRST_TAG_UUID, title: 'Кекстаграм' },
    { id: SECOND_TAG_UUID, title: 'Фотографии' },
  ];
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      type: PostType.Video,
      userId: FIRST_USER_ID,
      title: 'Перечисления в TypeScript',
      videoUrl: 'https://www.youtube.com/watch?v=iiTRXbTfKxM&ab',
      comments: [
        {
          userId: SECOND_USER_ID,
          text: 'Очень интересно.'
        }
      ]
    },
    {
      id: SECOND_POST_UUID,
      type: PostType.Link,
      userId: SECOND_USER_ID,
      link: 'https://htmlacademy-javascript.github.io/2506035-kekstagram-32/14',
      linkDescription: 'Кекстаграм',
      tags: {
        connect: [
          { id: FIRST_TAG_UUID },
          { id: SECOND_TAG_UUID },
        ]
      },
    }
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTags = getTags();
  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: {
        id: tag.id,
        title: tag.title,
      }
    });
  }

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {
        id: post.id,
        type: post.type,
        userId: post.userId,

        title: post.title,
        videoUrl: post.videoUrl,
        link: post.link,
        linkDescription: post.linkDescription,
        tags: post.tags,
        comments: post.comments ? {
          create: post.comments
        } : undefined
      },
      create: {
        id: post.id,
        type: post.type,
        userId: post.userId,

        title: post.title,
        videoUrl: post.videoUrl,
        link: post.link,
        linkDescription: post.linkDescription,
        tags: post.tags,
        comments: post.comments ? {
          create: post.comments
        } : undefined
      }
    });
  }

  console.info('Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
