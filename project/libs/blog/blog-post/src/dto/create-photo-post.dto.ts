import { PostType } from '@project/core';

export class CreatePhotoPostDto {
  public type: PostType;
  public tags: string[];
  public photoUrl: string;
}
