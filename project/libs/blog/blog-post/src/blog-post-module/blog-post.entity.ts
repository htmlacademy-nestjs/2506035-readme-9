import { Entity, Post, StorableEntity, PostContent } from '@project/core';
import { PostType, PostStatus } from '@prisma/client';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public type: PostType;
  public content: PostContent;
  public tags: string[];
  public commentsCount: number;
  public likesCount: number;
  public status: PostStatus;
  public userId: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public isRepost: boolean;
  public originalPostId?: string;
  public originalAuthorId?: string;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.type = post.type;
    this.content = post.content;
    this.tags = post.tags;
    this.commentsCount = post.commentsCount;
    this.likesCount = post.likesCount;
    this.status = post.status;
    this.userId = post.userId;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.isRepost = post.isRepost;
    this.originalPostId = post.originalPostId;
    this.originalAuthorId = post.originalAuthorId;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      type: this.type,
      content: this.content,
      tags: this.tags,
      commentsCount: this.commentsCount,
      likesCount: this.likesCount,
      status: this.status,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isRepost: this.isRepost,
      originalPostId: this.originalPostId,
      originalAuthorId: this.originalAuthorId,
    }
  }
}
