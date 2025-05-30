import { PostType } from '@project/core';

export class CreateQuotePostDto {
  public type: PostType;
  public tags: string[];
  public quote: string;
  public quoteAuthor: string;
}
