import { Injectable } from '@nestjs/common';

import { EntityFactory, Post } from '@project/core';

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
    entity.title = dto.title;
    entity.announcement = dto.announcement;
    entity.text = dto.text;
    entity.userId = dto.userId;
    entity.tags = dto.tags;
    entity.comments = [];

    return entity;
  }
}
