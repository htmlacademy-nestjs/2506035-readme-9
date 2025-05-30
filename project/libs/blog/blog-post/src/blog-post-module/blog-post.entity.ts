import { Entity, StorableEntity, Post, PostType } from '@project/core';
import { LinkPost, PhotoPost, QuotePost, TextPost, VideoPost } from '@project/core';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public type: PostType;
  public tags: string[];

  public link?: string;
  public linkDescription?: string;

  public photoUrl?: string;

  public quote?: string;
  public quoteAuthor?: string;

  public title?: string;
  public announcement?: string;
  public text?: string;

  public videoUrl?: string;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post) {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.type = post.type;
    this.tags = post.tags;

    switch (post.type) {
      case PostType.Link:
        this.link = post.link;
        this.linkDescription = post.linkDescription;
        break;

      case PostType.Photo:
        this.photoUrl = post.photoUrl;
        break;

      case PostType.Quote:
        this.quote = post.quote;
        this.quoteAuthor = post.quoteAuthor;
        break;

      case PostType.Text:
        this.title = post.title;
        this.announcement = post.announcement;
        this.text = post.text;
        break;

      case PostType.Video:
        this.title = post.title;
        this.videoUrl = post.videoUrl;
        break;
    }
  }

  public toPOJO(): Post {
    const base = {
      id: this.id,
      tags: this.tags,
      type: this.type,
    }

    switch (this.type) {
      case PostType.Link:
        return {
          ...base,
          link: this.link,
          linkDescription: this.linkDescription,
        } as LinkPost;

      case PostType.Photo:
        return {
          ...base,
          photoUrl: this.photoUrl,
        } as PhotoPost;

      case PostType.Quote:
        return {
          ...base,
          quote: this.quote,
          quoteAuthor: this.quoteAuthor,
        } as QuotePost;

      case PostType.Text:
        return {
          ...base,
          title: this.title,
          announcement: this.announcement,
          text: this.text,
        } as TextPost;

      case PostType.Video:
        return {
          ...base,
          title: this.title,
          videoUrl: this.videoUrl,
        } as VideoPost;
    }
  }
}
