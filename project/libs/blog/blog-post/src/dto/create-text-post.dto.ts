import { PostType } from '@project/core';

export class CreateTextPostDto {
  public type: PostType;
  public tags: string[];
  public title: string;
  public announcement: string;
  public text: string;
}
