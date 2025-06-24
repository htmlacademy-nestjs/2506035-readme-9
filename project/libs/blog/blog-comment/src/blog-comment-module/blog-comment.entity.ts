import { Comment, Entity, StorableEntity } from '@project/core';

export class BlogCommentEntity extends Entity implements StorableEntity<Comment> {
  public createdAt: Date;
  public updatedAt: Date;
  public postId?: string;
  public text: string;
  public userId: string;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.createdAt = comment.createdAt ?? undefined;
    this.updatedAt = comment.updatedAt ?? undefined;
    this.text = comment.text;
    this.postId = comment.postId;
    this.userId = comment.userId;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      text: this.text,
      postId: this.postId,
      userId: this.userId,
    }
  }
}
