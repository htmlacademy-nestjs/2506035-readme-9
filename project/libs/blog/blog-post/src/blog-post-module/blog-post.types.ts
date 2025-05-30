import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { CreateQuotePostDto } from '../dto/create-quote-post.dto';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';

export type CreatePostDto = CreateLinkPostDto
  | CreatePhotoPostDto
  | CreateQuotePostDto
  | CreateTextPostDto
  | CreateVideoPostDto;
