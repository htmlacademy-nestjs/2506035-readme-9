type LinkPostContent = {
  url: string;
  description?: string;
}

type PhotoPostContent = {
  photoId: string;
}

type QuotePostContent = {
  quote: string;
  author: string;
}

type TextPostContent = {
  title: string;
  announcement: string;
  text: string;
}

type VideoPostContent = {
  title: string;
  url: string;
}

export type PostContent = LinkPostContent | PhotoPostContent | QuotePostContent | TextPostContent | VideoPostContent;
