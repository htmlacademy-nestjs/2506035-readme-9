import { PostType } from '@project/core';

export class CreateLinkPostDto {
  public type: PostType;
  public tags: string[];
  public link: string;
  public linkDescription: string;
}
