import { PostType } from './post-type.enum';

interface BasePost {
  id?: string;
  tags: string[];
  type: PostType;
}

export interface LinkPost extends BasePost {
  type: PostType.Link;
  link: string;
  linkDescription: string;
}

export interface PhotoPost extends BasePost {
  type: PostType.Photo;
  photoUrl: string;
}

export interface QuotePost extends BasePost {
  type: PostType.Quote;
  quote: string;
  quoteAuthor: string;
}

export interface TextPost extends BasePost {
  type: PostType.Text;
  title: string;
  announcement: string;
  text: string;
}

export interface VideoPost extends BasePost {
  type: PostType.Video;
  title: string;
  videoUrl: string;
}

export type Post = LinkPost | PhotoPost | QuotePost | TextPost | VideoPost;
