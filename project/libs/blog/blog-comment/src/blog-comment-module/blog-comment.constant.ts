export const MAX_COMMENTS_COUNT = 50;

export const DEFAULT_COMMENT_COUNT_LIMIT = 50;
export const DEFAULT_PAGE_COUNT = 1;

export const BlogCommentValidateMessage = {
  TextIsEmpty: 'The text is empty',
  InvalidID: 'Invalid author id',
} as const;

export const BlogCommentResponseMessages = {
  Forbidden: 'Access denied',
  ServerError: 'Internal server error',
  CommentDeleted: 'Comment deleted',
  CommentFound: 'Comment found',
  CommentNotFound: 'Comment not found.',
} as const;
