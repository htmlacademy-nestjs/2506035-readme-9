import { Controller, Get, Param, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { BlogCommentService } from './blog-comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { UserIdDto } from './dto/user-id.dto';
import { fillDto } from '@project/helpers';
import { BlogCommentResponseMessages } from './blog-comment.constant';

@Controller('comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService,
  ) { }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: BlogCommentResponseMessages.CommentFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentResponseMessages.CommentNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogCommentResponseMessages.ServerError,
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const commentEntity = await this.blogCommentService.getComment(id);
    return fillDto(CommentRdo, commentEntity.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogCommentResponseMessages.CommentDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentResponseMessages.CommentNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: BlogCommentResponseMessages.Forbidden,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogCommentResponseMessages.ServerError,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('delete/:id')
  public async destroy(
    @Param('id') id: string,
    @Body() { userId }: UserIdDto
  ) {
    await this.blogCommentService.deleteComment(id, userId);
  }
}
