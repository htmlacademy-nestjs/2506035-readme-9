import { SortType, SortDirection } from '@project/core';

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_TYPE = SortType.CreationDate;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const BlogPostResponseMessages = {
  PostCreated: 'Post created',
  PostFound: 'Post found',
  PostDeleted: 'Post deleted.',
  PostUpdated: 'Post updated',
  LikeAdded: 'Like added',
  LikeRemoved: 'Like remowed',
  CommentCreated: 'Comment created',
  CommentsFound: 'Comments found',
  NotificationsSent: 'Notification sent',
  PostNotFound: 'Post not found',
  Forbidden: 'Access denied',
  AuthError: 'Authentication failed',
  ValidationError: 'Validation error',
  ServerError: 'Internal server error.',
} as const;
