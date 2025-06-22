import { ApiResponse } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Query, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostType } from '@prisma/client';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { PostCreateDto } from './dto/post-create.dto';
import { Comment, Post as PostInterface } from '@project/core';
import { BlogPostQuery, BlogPostRdo, BlogPostResponseMessages, BlogPostWithPaginationRdo } from '@project/blog-post';
import { PostUpdateDto } from './dto/post-update.dto';
import { BlogCommentQuery, BlogCommentWithPaginationRdo, CommentRdo } from '@project/blog-comment';
import { CommentCreateDto } from './dto/comment-create.dto';
import { transformPost } from './helpers/transform-post';
import { fillUserInfo } from './helpers/fill-user-info';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) { }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessages.NotificationsSent,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('notify')
  public async notifyNewPosts() {
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/notify`);
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: BlogPostResponseMessages.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthError,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  public async create(
    @Body() dto: PostCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ) {
    if (dto.type === PostType.PHOTO) {
      if (file) {
        const formData = new FormData();

        formData.append(
          'file',
          new Blob([file.buffer], { type: file.mimetype }),
          file.originalname
        );

        const { data } = await this.httpService.axiosRef.post(
          `${ApplicationServiceURL.Files}/upload`,
          formData
        );

        dto.content = {
          photoId: data.id,
        };
      } else {
        throw new BadRequestException(
          `With ${PostType.PHOTO} a "file" field is required`
        );
      }
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/`, dto);

    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/incrementPostsCount/${dto['userId']}`
    );

    return data;
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessages.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get<PostInterface>(
      `${ApplicationServiceURL.Posts}/${id}`
    );

    await transformPost(this.httpService, data);

    return data;
  }

  @ApiResponse({
    type: BlogPostWithPaginationRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessages.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const { data } = await this.httpService.axiosRef.get<{ entities: PostInterface[] }>(
      `${ApplicationServiceURL.Posts}`, { params: query }
    );

    for (const post of data.entities) {
      await transformPost(this.httpService, post);
    }

    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessages.LikeAdded,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('addLike/:postId')
  public async saveLike(@Param('postId') postId: string, @Body() dto) {
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/addLike/${postId}`, dto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessages.LikeRemoved,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('deleteLike/:postId')
  public async deleteLike(@Param('postId') postId: string, @Body() dto) {
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/deleteLike/${postId}`, dto);
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: BlogPostResponseMessages.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('repost/:postId')
  public async repost(@Param('postId') postId: string, @Body() dto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/repost/${postId}`, dto);

    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/incrementPostsCount/${dto['userId']}`
    );

    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessages.PostDeleted,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: BlogPostResponseMessages.Forbidden,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:postId')
  public async destroy(@Param('postId') postId: string, @Body() dto) {
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/delete/${postId}`, dto);
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/decrementPostsCount/${dto['userId']}`);
  }

  @ApiResponse({
    type: BlogPostRdo,
    description: BlogPostResponseMessages.PostUpdated,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BlogPostResponseMessages.ValidationError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: BlogPostResponseMessages.Forbidden,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() dto: PostUpdateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ) {
    if (dto.type === PostType.PHOTO) {
      const { data: existsPost } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/${id}`);

      if (existsPost.type === PostType.PHOTO) {
        dto.content = existsPost.content;
      }

      if (file) {
        const formData = new FormData();

        formData.append(
          'file',
          new Blob([file.buffer], { type: file.mimetype }),
          file.originalname
        );

        const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, formData);
        dto.content = { photoId: data.id };
      } else if (existsPost.type !== PostType.PHOTO) {
        throw new BadRequestException(`With ${PostType.PHOTO} a "file" field is required`);
      }
    }

    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${id}`, dto);
    return data;
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: BlogPostResponseMessages.CommentCreated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/:postId/comments')
  public async createComment(@Param('postId') postId: string, @Body() dto: CommentCreateDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/${postId}/comments`,
      dto
    );

    return data;
  }

  @ApiResponse({
    type: BlogCommentWithPaginationRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessages.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @Get('/:postId/comments')
  public async getComments(@Param('postId') postId: string, @Query() query: BlogCommentQuery) {
    const { data } = await this.httpService.axiosRef.get<{ entities: Comment[] }>(
      `${ApplicationServiceURL.Posts}/${postId}/comments`,
      { params: query }
    );

    for (const comment of data.entities) {
      await fillUserInfo(this.httpService, comment);
    }

    return data;
  }
}
