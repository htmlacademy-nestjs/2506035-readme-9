import { Entity, Post, StorableEntity } from '@project/core';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';
import { PostType } from '@prisma/client';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public type: PostType;
  public title: string;
  public announcement: string;
  public text: string;
  public comments: BlogCommentEntity[];
  public tags: string[];
  public userId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

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
    this.title = post.title;
    this.announcement = post.announcement;
    this.text = post.text;
    this.comments = [];
    this.tags = post.tags;
    this.userId = post.userId;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;

    const blogCommentFactory = new BlogCommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      announcement: this.announcement,
      text: this.text,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
      tags: this.tags,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
