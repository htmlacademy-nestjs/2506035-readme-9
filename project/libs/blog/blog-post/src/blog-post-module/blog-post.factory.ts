import { Injectable } from '@nestjs/common';

import { EntityFactory, Post } from '@project/core';
import { PostStatus } from '@prisma/client';

import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.type = dto.type;
    entity.content = dto.content;
    entity.tags = dto.tags;
    entity.status = PostStatus.PUBLISHED;
    entity.userId = dto.userId;
    entity.isRepost = false;

    return entity;
  }
}
