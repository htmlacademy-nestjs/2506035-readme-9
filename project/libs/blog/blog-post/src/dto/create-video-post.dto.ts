import { PostType } from '@project/core';

export class CreateVideoPostDto {
  public type: PostType;
  public tags: string[];
  public title: string;
  public videoUrl: string;
}
