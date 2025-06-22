import { ApiResponse } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';

import { InjectUserIdInterceptor } from '@project/interceptors';
import { BlogCommentResponseMessages } from '@project/blog-comment';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';

@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentController {
  constructor(private readonly httpService: HttpService) { }

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
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete(':id')
  public async destroy(@Param('id') id: string, @Body() dto) {
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/delete/${id}`, dto);
  }
}
