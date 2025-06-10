import { PrismaClient } from '@prisma/client';

enum PostType {
  Link = 'LINK',
  Photo = 'PHOTO',
  Quote = 'QUOTE',
  Text = 'TEXT',
  Video = 'VIDEO',
}

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      type: PostType.Text,
      title: 'Перечисления в TypeScript',
      announcement: 'Всё о перечислениях в TypeScript.',
      text: 'Информация о перечислениях в TypeScript.',
      tags: ['TypeScript', 'enum'],
      userId: FIRST_USER_ID,
    },
    {
      id: SECOND_POST_UUID,
      type: PostType.Text,
      title: 'Вы не знаете JavaScript',
      announcement: 'Секреты и тайные знания по JavaScript.',
      text: 'Полезная книга по JavaScript',
      comments: [
        {
          text: 'Это действительно отличная книга!',
          userId: FIRST_USER_ID,
        },
        {
          text: 'Надо будет обязательно перечитать. Слишком много информации.',
          userId: SECOND_USER_ID,
        }
      ],
      userId: SECOND_USER_ID,
    }
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {
        id: post.id,
        type: post.type,
        title: post.title,
        announcement: post.announcement,
        text: post.text,
        comments: post.comments ? {
          create: post.comments
        } : undefined,
        tags: post.tags,
        userId: post.userId,
      },
      create: {
        id: post.id,
        type: post.type,
        title: post.title,
        announcement: post.announcement,
        text: post.text,
        comments: post.comments ? {
          create: post.comments
        } : undefined,
        tags: post.tags,
        userId: post.userId,
      }
    });
  }

  console.info('Database was filled 🦊');
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
