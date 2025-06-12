import { PostType } from '@prisma/client';
import { Comment } from './comment.interface';

export interface Post {
  id?: string;
  type: PostType;
  title: string;
  announcement: string;
  text: string;
  comments: Comment[];
  tags: string[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
