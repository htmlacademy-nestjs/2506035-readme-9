import {Transform, Type} from 'class-transformer';
import {IsEnum, IsNumber, IsOptional} from 'class-validator';

import { SortDirection } from '@project/core';

import {
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_PAGE_COUNT
} from './blog-post.constant';

export class BlogPostQuery {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
