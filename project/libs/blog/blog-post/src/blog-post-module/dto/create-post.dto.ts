import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { PostType } from '@prisma/client';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public type: PostType;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public announcement: string;

  @IsString()
  @IsNotEmpty()
  public text: string;

  @IsString()
  @IsMongoId()
  public userId: string;

  @IsArray()
  public tags: string[];
}
