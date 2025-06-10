import { Expose } from 'class-transformer';
import { PostType } from '@prisma/client';

export class BlogPostRdo {
  @Expose()
  public id: string;

  @Expose()
  public type: PostType;

  @Expose()
  public title: string;

  @Expose()
  public announcement: string;

  @Expose()
  public text: string;

  @Expose()
  public comments: Comment[]

  @Expose()
  public tags: string[];

  @Expose()
  public userId: string;

  @Expose()
  public createdAt: string;
}
