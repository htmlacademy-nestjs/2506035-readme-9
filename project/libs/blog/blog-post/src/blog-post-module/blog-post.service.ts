import { Injectable } from '@nestjs/common';

import { PostType } from '@project/core';
import { Post } from '@project/core';

import { BlogPostEntity } from './blog-post.entity';
import { BlogPostRepository } from './blog-post.repository';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { CreateQuotePostDto } from '../dto/create-quote-post.dto';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';

type CreatePostDto = CreateLinkPostDto
  | CreatePhotoPostDto
  | CreateQuotePostDto
  | CreateTextPostDto
  | CreateVideoPostDto;

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) { }

  public async createPost<T extends CreatePostDto>(dto: T) {
    let blogPost: CreatePostDto;
    const { type, tags } = dto;

    switch (type) {
      case PostType.Link: {
        const { link, linkDescription } = dto as CreateLinkPostDto;
        blogPost = { type, tags, link, linkDescription };
        break;
      }
      case PostType.Photo: {
        const { photoUrl } = dto as CreatePhotoPostDto;
        blogPost = { type, tags, photoUrl };
        break;
      }
      case PostType.Quote: {
        const { quote, quoteAuthor } = dto as CreateQuotePostDto;
        blogPost = { type, tags, quote, quoteAuthor };
        break;
      }
      case PostType.Text: {
        const { title, text, announcement } = dto as CreateTextPostDto;
        blogPost = { type, tags, title, text, announcement };
        break;
      }
      case PostType.Video: {
        const { title, videoUrl } = dto as CreateVideoPostDto;
        blogPost = { type, tags, title, videoUrl };
        break;
      }
    }

    const postEntity = await new BlogPostEntity(blogPost as Post);
    this.blogPostRepository.save(postEntity);
    return postEntity;
  }

  public async getPost(id: string) {
    return this.blogPostRepository.findById(id);
  }
}
