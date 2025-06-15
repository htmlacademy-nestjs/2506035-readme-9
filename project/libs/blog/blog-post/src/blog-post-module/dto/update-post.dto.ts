import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PostType } from '@prisma/client';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public type: PostType;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public announcement?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text?: string;

  @IsArray()
  @IsOptional()
  public tags?: string[];
}
