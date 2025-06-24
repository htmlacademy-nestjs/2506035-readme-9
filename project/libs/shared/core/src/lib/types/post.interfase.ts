import { PostType, PostStatus } from '@prisma/client';
import { PostContent } from './post-content';

export interface Post {
  id?: string;
  type: PostType;
  content: PostContent;
  tags: string[];
  commentsCount: number;
  likesCount: number;
  status: PostStatus;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  isRepost: boolean;
  originalPostId?: string;
  originalAuthorId?: string;
}
